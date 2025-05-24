"use client";
import { useState } from "react";
import { useSession } from "@/context/SessionProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DarkModeSwitch from "./DarkModeSwitch";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    router.push("/sign-in");
  };

  return (
    <header className="bg-[#f6f8fa] dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center py-4 px-6 max-w-7xl mx-auto">
        {/* Logo + Dark Mode */}
        <div className="flex items-center gap-4">
          <DarkModeSwitch />
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white bg-amber-500 px-3 py-1 rounded-lg shadow-sm">
              S5
            </span>
            <span className="text-xl hidden sm:inline text-gray-700 dark:text-gray-300 font-semibold">
              Aviator
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex items-center gap-6 text-gray-700 dark:text-gray-200 font-medium">
          {!user ? (
            <>
              <li>
                <Link
                  href="/sign-up"
                  className="hover:text-amber-500 transition-colors"
                >
                  Sign up
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  className="hover:text-amber-500 transition-colors"
                >
                  Sign in
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/crew"
                  className="hover:text-amber-500 transition-colors"
                >
                  Crew
                </Link>
              </li>
              <li>
                <Link
                  href="/gendec"
                  className="hover:text-amber-500 transition-colors"
                >
                  GenDec
                </Link>
              </li>
              <li className="relative group">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500 cursor-pointer">
                  <img
                    src={
                      user?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || "User"
                      )}&background=amber&color=fff`
                    }
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    onClick={() => {}}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700"
                  >
                    Setings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu with Transition */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-60 py-4 px-6" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-200 font-medium bg-white dark:bg-gray-900">
          <li>
            <Link
              href="/sign-in"
              onClick={() => setMenuOpen(false)}
              className="hover:text-amber-500"
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              href="/crew"
              onClick={() => setMenuOpen(false)}
              className="hover:text-amber-500"
            >
              Crew
            </Link>
          </li>
          <li>
            <Link
              href="/gendec"
              onClick={() => setMenuOpen(false)}
              className="hover:text-amber-500"
            >
              GenDec
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
