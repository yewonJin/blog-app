import Link from 'next/link';

import { ThemeToggle } from '@/features/theme/ui/ThemeToggle';

export default function TopNav() {
  return (
    <nav className="mb-12 flex h-20 w-full items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-neutral-emphasis">
        DLOG
      </Link>
      <div className="">
        <ThemeToggle />
      </div>
    </nav>
  );
}
