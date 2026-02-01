import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [age, setAge] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getUserProfile();
        setUser(data);
        setAge(data.age || "");
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
    try {
      const { data } = await updateUserProfile({ age });
      setUser(data);
      alert("Profile updated successfully");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Failed to load profile.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <form onSubmit={handleUpdate}>
        <div className="mt-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
