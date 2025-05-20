'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { TailChase } from 'ldrs/react';
import 'ldrs/react/TailChase.css';

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle error messages from URL params
    const error = searchParams.get('error');
    if (error === 'session_expired') {
      toast.error('Your session has expired. Please login again.');
    }
  }, [searchParams]);

  //Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

  //Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Always use user endpoint for simple login
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`;

        const response = await axios.post(endpoint, values);
        const { token, user } = response.data;

        // Use the login function from auth context
        await login(token, user);
        toast.success("Login Successful");

        // Redirect to dashboard or user home
        router.push('/');
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Login Failed. Please check your credentials.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <main className="relative py-20 bg-gray-900 bg-linear-to-b from-violet-900/10 via-transparent">
      <div>
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-2xs max-w-lg mx-auto">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
              <p className="mt-2 text-sm text-gray-600">
                Don't have an account yet?
                <a className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium" href="/signup">
                  Sign up here
                </a>
              </p>
            </div>

            <div className="mt-5">
              <button 
                onClick={handleGoogleLogin} 
                type="button" 
                disabled={isLoading}
                className="w-full cursor-pointer py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                ) : (
                  <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                    <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                    <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                    <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                    <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                  </svg>
                )}
                {isLoading ? 'Signing in...' : 'Sign in with Google'}
              </button>

              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">Or</div>

              {/* Manual Sign In Form */}
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-y-4">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="py-2.5 sm:py-3 px-4 block w-full border border-gray-800 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-xs text-red-600 mt-2" id="email-error">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>
                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className="py-2.5 sm:py-3 px-4 block w-full border border-gray-800 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        required
                        aria-describedby="password-error"
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          // Eye icon (show password)
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C3.5 7.5 7.5 4.5 12 4.5c4.5 0 8.5 3 9.75 7.5-1.25 4.5-5.25 7.5-9.75 7.5-4.5 0-8.5-3-9.75-7.5z" />
                            <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          </svg>
                        ) : (
                          // Eye-off icon (hide password)
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A9.77 9.77 0 002.25 12c1.25 4.5 5.25 7.5 9.75 7.5 1.61 0 3.14-.31 4.52-.877M6.53 6.53A9.77 9.77 0 0112 4.5c4.5 0 8.5 3 9.75 7.5a9.77 9.77 0 01-1.272 2.545M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9 9l18-18" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-xs text-red-600 mt-2" id="password-error">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                  {/* Sign In Button */}
                  <button
                    disabled={isLoading || formik.isSubmitting}
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {formik.isSubmitting || isLoading ? (
                      <TailChase
                        size="40"
                        strokeLength="0.15"
                        bgOpacity="0.1"
                        speed="1.4"
                        color="black"
                      />
                    ) : "Sign In"}
                  </button>
                </div>
              </form>
              {/* End Manual Sign In Form */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
