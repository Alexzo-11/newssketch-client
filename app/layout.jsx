import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
// In layout.jsx
import './tailwind.css';
import './globals.css';
import '@/styles/tinymce.css';



// Import fonts with fallback
// import { Montserrat, Open_Sans } from 'next/font/google';

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   weight: ['400', '600', '700'],
//   display: 'swap',
//   fallback: ['Arial', 'sans-serif'],
//   adjustFontFallback: true,
// });

// const openSans = Open_Sans({
//   subsets: ['latin'],
//   weight: ['400', '600'],
//   display: 'swap',
//   fallback: ['Arial', 'sans-serif'],
//   adjustFontFallback: true,
// });

export const metadata = {
  title: 'News Sketch – Telling Stories That Matter...',
  description: 'Premium news platform with modern design.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-softLightGray dark:bg-charcoal text-charcoal dark:text-white transition-colors min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );

}