import Link from 'next/link';

import { ThemeToggle } from '@/features/theme';

export default function TopNav() {
  return (
    <nav className="mx-auto mb-6 flex h-20 w-full max-w-[1200px] items-center justify-between xl:mb-12">
      <Link href="/" className="text-2xl font-bold text-neutral-emphasis">
        DLOG
      </Link>
      <div className="">
        <ThemeToggle />
      </div>
    </nav>
  );
}
