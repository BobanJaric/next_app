// src/hooks/useAuth.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = ({ redirectTo = '/sign-in', protectedRoute = false } = {}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  
  useEffect(() => {
    console.log("here");
    const checkAuth = async () => {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      setUser(data.user);
      setLoading(false);

      if (protectedRoute && !data.user) {
        router.replace(redirectTo);
      }
    };

    checkAuth();
  }, [redirectTo, protectedRoute, router]);

  return { user, loading };
};
