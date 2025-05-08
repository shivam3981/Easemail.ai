'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function TokenHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error('Authentication failed. Please try again.');
      router.push('/login');
      return;
    }

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('token', token);
      
      // Fetch user data
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // Store user data
            localStorage.setItem('user', JSON.stringify(data.user));
            toast.success('Successfully logged in!');
            router.push('/user/compose'); // Redirect to dashboard or home page
          } else {
            throw new Error('Failed to fetch user data');
          }
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          toast.error('Failed to complete authentication');
          router.push('/login');
        });
    } else {
      toast.error('No authentication token received');
      router.push('/login');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Completing Authentication...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
} 