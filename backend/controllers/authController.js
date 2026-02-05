import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const buildAuthResponse = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    authProvider: user.authProvider,
    avatarUrl: user.avatarUrl || null
});

const normalizeEmail = (email = '') => email.trim().toLowerCase();

const upsertSocialUser = async ({ provider, providerId, email, name, avatarUrl }) => {
    if (!email) {
        const err = new Error('Email not available from provider');
        err.statusCode = 400;
        throw err;
    }

    const normalizedEmail = normalizeEmail(email);
    const providerKey = provider === 'google' ? 'googleId' : 'facebookId';

    let user = await User.findOne({
        $or: [{ email: normalizedEmail }, { [providerKey]: providerId }]
    });

    if (!user) {
        user = await User.create({
            name: name || normalizedEmail.split('@')[0],
            email: normalizedEmail,
            authProvider: provider,
            [providerKey]: providerId,
            avatarUrl
        });
        return user;
    }

    const updates = {};
    if (!user[providerKey]) updates[providerKey] = providerId;
    if (!user.avatarUrl && avatarUrl) updates.avatarUrl = avatarUrl;
    if (Object.keys(updates).length) {
        Object.assign(user, updates);
        await user.save();
    }

    return user;
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        if (!name || !email || !password || !phone) {
            res.status(400).json({ message: 'Name, email, password, and phone are required' });
            return;
        }

        const normalizedEmail = normalizeEmail(email);
        const userExists = await User.findOne({ email: normalizedEmail });

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            phone,
            authProvider: 'local'
        });

        if (user) {
            res.status(201).json(buildAuthResponse(user));
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const normalizedEmail = normalizeEmail(email);
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        if (!user.password) {
            res.status(400).json({ message: 'This account uses social login. Please continue with Google or Facebook.' });
            return;
        }

        if (await bcrypt.compare(password, user.password)) {
            res.json(buildAuthResponse(user));
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginWithGoogle = async (req, res) => {
    const { accessToken } = req.body;

    if (!accessToken) {
        res.status(400).json({ message: 'Missing Google access token' });
        return;
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
        res.status(500).json({ message: 'Google login is not configured' });
        return;
    }

    try {
        const tokenInfoResponse = await fetch(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${encodeURIComponent(accessToken)}`
        );

        if (!tokenInfoResponse.ok) {
            res.status(401).json({ message: 'Invalid Google access token' });
            return;
        }

        const tokenInfo = await tokenInfoResponse.json();
        if (tokenInfo.aud !== process.env.GOOGLE_CLIENT_ID) {
            res.status(401).json({ message: 'Google token audience mismatch' });
            return;
        }

        const userInfoResponse = await fetch(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        if (!userInfoResponse.ok) {
            res.status(401).json({ message: 'Unable to fetch Google user info' });
            return;
        }

        const userInfo = await userInfoResponse.json();
        const user = await upsertSocialUser({
            provider: 'google',
            providerId: userInfo.sub,
            email: userInfo.email,
            name: userInfo.name,
            avatarUrl: userInfo.picture
        });

        res.json(buildAuthResponse(user));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginWithFacebook = async (req, res) => {
    const { accessToken } = req.body;

    if (!accessToken) {
        res.status(400).json({ message: 'Missing Facebook access token' });
        return;
    }

    if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
        res.status(500).json({ message: 'Facebook login is not configured' });
        return;
    }

    try {
        const debugResponse = await fetch(
            `https://graph.facebook.com/debug_token?input_token=${encodeURIComponent(
                accessToken
            )}&access_token=${encodeURIComponent(
                `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`
            )}`
        );

        if (!debugResponse.ok) {
            res.status(401).json({ message: 'Invalid Facebook access token' });
            return;
        }

        const debugData = await debugResponse.json();
        if (!debugData?.data?.is_valid || debugData?.data?.app_id !== process.env.FACEBOOK_APP_ID) {
            res.status(401).json({ message: 'Invalid Facebook token' });
            return;
        }

        const userInfoResponse = await fetch(
            `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${encodeURIComponent(
                accessToken
            )}`
        );

        if (!userInfoResponse.ok) {
            res.status(401).json({ message: 'Unable to fetch Facebook user info' });
            return;
        }

        const userInfo = await userInfoResponse.json();
        const user = await upsertSocialUser({
            provider: 'facebook',
            providerId: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            avatarUrl: userInfo?.picture?.data?.url
        });

        res.json(buildAuthResponse(user));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
