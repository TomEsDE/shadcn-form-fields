/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FC4EZE6qdJV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { SpaceIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary">
          <SpaceIcon className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, lost in space!
        </h1>
        <p className="mt-4 text-muted-foreground">
          {`The page you're looking for seems to have drifted off into the cosmic
          void. Don't worry, we'll help you find your way back home.`}
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Take me back to Earth
          </Link>
        </div>
      </div>
    </div>
  );
}
