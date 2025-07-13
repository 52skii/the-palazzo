// /src/pages/_app.tsx

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}
s