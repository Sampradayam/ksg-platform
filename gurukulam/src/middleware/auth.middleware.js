export default function auth(req, res, next) {
  // Example only – replace with real JWT verification
  req.user = {
    id: 'admin-uuid',
    role: 'ADMIN'
  };
  next();
}
