'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className=" bg-gray-900 bg-linear-to-b from-violet-900/10 via-transparent">
      <>
        {/* ========== HEADER ========== */}
        <header className="flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full py-7 ">
          <nav className="relative max-w-7xl w-full flex flex-wrap lg:grid lg:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto">
            <div className="lg:col-span-3 flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-5xl font-bold cursor-pointer text-white">EaseMail.ai</span>
              </Link>
            </div>
            {/* Button Group */}
            <div className="flex items-center gap-x-1 lg:gap-x-2 ms-auto py-1 lg:ps-6 lg:order-3 lg:col-span-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700  hover:text-blue-600 px-3 py-2 rounded-md text-2xl font-bold"
                  >
                    Dashboard
                  </Link>
                  <div className="relative group">
                    <button
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      {user.photo ? (
                        <Image
                          src={user.photo}
                          alt={user.displayName}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                          {user.displayName?.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm font-medium">{user.displayName}</span>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="bg-white text-black hover:bg-black hover:text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"

                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-white text-black hover:bg-black hover:text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                  >
                    SignUp
                  </Link>
                </>
              )}
              <div className="lg:hidden">
                <button
                  type="button"
                  className="hs-collapse-toggle size-9.5 flex justify-center items-center text-sm font-semibold rounded-xl border border-gray-200 text-black hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                  id="hs-navbar-hcail-collapse"
                  aria-expanded="false"
                  aria-controls="hs-navbar-hcail"
                  aria-label="Toggle navigation"
                  data-hs-collapse="#hs-navbar-hcail"
                >
                  <svg
                    className="hs-collapse-open:hidden shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1={3} x2={21} y1={6} y2={6} />
                    <line x1={3} x2={21} y1={12} y2={12} />
                    <line x1={3} x2={21} y1={18} y2={18} />
                  </svg>
                  <svg
                    className="hs-collapse-open:block hidden shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {/* End Button Group */}
            {/* Collapse */}
            <div
              id="hs-navbar-hcail"
              className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow lg:block lg:w-auto lg:basis-auto lg:order-2 lg:col-span-6"
              aria-labelledby="hs-navbar-hcail-collapse"
            >
              <div className="flex flex-col gap-y-4 gap-x-0 mt-5 lg:flex-row lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 lg:mt-0">
                <div>
                  <Link
                    className="inline-block text-white hover:text-gray-600 focus:outline-hidden focus:text-gray-600"
                    href="/about"
                  >
                    About
                  </Link>
                </div>
                <div>
                  <Link
                    className="inline-block text-white hover:text-gray-600 focus:outline-hidden focus:text-gray-600"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            {/* End Collapse */}
          </nav>
        </header>
        {/* ========== END HEADER ========== */}
      </>

    </div>
  )
}

export default Navbar;