"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/SessionProvider";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const { login } = useSession();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/users/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

       if (res.ok) {
        setStatus("success");
        login(data.user); // Save user to context/localStorage
        router.push("/gendec"); // Redirect after login
      } else {
        setStatus(data.error);
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl shadow-2xl border border-blue-200 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-amber-400 mb-6">
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-blue-800 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-blue-800 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-amber-500 text-white font-semibold hover:from-blue-600 hover:to-amber-600 transition-all"
        >
          Submit
        </button>
      </form>

      {status === "loading" && (
        <p className="mt-4 text-center text-blue-500">Submitting...</p>
      )}
      {status === "success" && (
        <p className="mt-4 text-center text-green-600">LoggedIn!</p>
      )}
      {status && status !== "loading" && status !== "success" && (
        <p className="mt-4 text-center text-red-600">{status}</p>
      )}
    </div>
  );
}
