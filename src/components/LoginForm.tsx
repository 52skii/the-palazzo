"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed. Please check your credentials.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <section className="bg-gray-100 py-12 px-4 mt-12" id="admin-login">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {user ? "Admin Panel" : "Admin Login"}
        </h3>

        {user ? (
          <div>
            <p className="mb-4 text-sm text-gray-600">
              Logged in as: <strong>{user.email}</strong>
            </p>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Login
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
