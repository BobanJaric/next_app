"use client";

import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/users/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "" });
      } else {
        console.log("here");
        const X = (result.error?.match(/{(.*?)}/g))[0];
        const T=X.match(/"(.*?)"/g);
        console.log(T[0]);
        setStatus("Email adress"+T[0]+" is already in use");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl shadow-2xl border border-blue-200 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-amber-400 mb-6">
        Create User
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-blue-800 dark:text-gray-300 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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
            autoComplete="off"
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
        <p className="mt-4 text-center text-green-600">User created!</p>
      )}
      {status && status !== "loading" && status !== "success" && (
        <p className="mt-4 text-center text-red-600">{status}</p>
      )}
    </div>
  );
}
