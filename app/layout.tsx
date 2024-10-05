import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'shadcn form field wrapper',
  description:
    'Improve your development with compact, feature rich form field components for shadcn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class">
          <div className={cn('px-0', 'border-0')}>
            <Header />
            <main className="pt-[clamp(1rem,5cqw,6rem)]">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
