import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import CartToggleButton from '@/components/CartToggleButton';

export default function App({ Component, pageProps }: AppProps) {
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
        <CartToggleButton onClick={() => setCartOpen(true)} />
      </CartProvider>
    </AuthProvider>
  );
}
