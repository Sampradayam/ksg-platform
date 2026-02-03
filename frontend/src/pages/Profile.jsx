import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile();
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          age: data.age ?? "",
          password: "",
          confirmPassword: "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: formData.age === "" ? undefined : Number(formData.age),
        ...(formData.password ? { password: formData.password } : {}),
      };

      const { data } = await updateUserProfile(payload);
      setUser(data);
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
      setIsEditing(false);
      setSuccess("Profile updated successfully");
      try {
        const stored = JSON.parse(localStorage.getItem("userInfo")) || {};
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ ...stored, ...data }),
        );
      } catch {
        // ignore localStorage errors
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update profile";
      setError(message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] text-[#3E2723] flex items-center justify-center">
        <div className="text-lg font-semibold">Loading your profile…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] text-[#3E2723] flex items-center justify-center">
        <div className="text-lg font-semibold">Failed to load profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-[#3E2723] px-6 py-20 mt-14">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">
          <div className="px-8 py-10 md:px-12 md:py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center text-2xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h1
                    className="text-3xl md:text-4xl font-bold text-[#3E2723]"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    My Profile
                  </h1>
                  <p
                    className="text-[#5D4037] text-sm md:text-base"
                    style={{ fontFamily: "Crimson Text, serif" }}
                  >
                    Update your personal details and preferences
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditing((prev) => !prev);
                  setError("");
                  setSuccess("");
                }}
                className="px-5 py-3 bg-[#D84315] text-white rounded-xl font-semibold hover:bg-[#BF360C] transition-all"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>

            {(error || success) && (
              <div
                className={`mt-6 rounded-xl px-4 py-3 text-sm font-semibold ${
                  error
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                {error || success}
              </div>
            )}

            <form onSubmit={handleUpdate} className="mt-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    autoComplete="name"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    autoComplete="email"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    autoComplete="tel"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        age: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    autoComplete="new-password"
                    disabled={!isEditing}
                    placeholder="Leave blank to keep current password"
                    className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    autoComplete="new-password"
                    disabled={!isEditing}
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={!isEditing}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: user.name || "",
                      email: user.email || "",
                      phone: user.phone || "",
                      age: user.age ?? "",
                      password: "",
                      confirmPassword: "",
                    });
                    setIsEditing(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="px-6 py-3 bg-white border border-orange-200 text-[#3E2723] rounded-xl font-semibold hover:bg-orange-50 transition-all"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:wght@400;600;700&display=swap");
      `}</style>
    </div>
  );
}
