// /src/pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import CartToggleButton from '@/components/CartToggleButton';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
        <CartDrawer />
        <CartToggleButton />
      </CartProvider>
    </AuthProvider>
  );
}
