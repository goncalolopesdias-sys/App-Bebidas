import { AuthProvider, useAuth } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const inAuthGroup = segments[0] === 'login' || segments[0] === 'register';

    if (!user && !inAuthGroup) {
      router.replace('/login');
    } else if (user && inAuthGroup) {
      router.replace('/');
    }
  }, [ready, user, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <AuthGuard>
          <Slot />
        </AuthGuard>
      </CartProvider>
    </AuthProvider>
  );
}
