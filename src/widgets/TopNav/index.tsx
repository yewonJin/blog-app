import Link from 'next/link';

import { ThemeToggle } from '@/features/theme/ui/ThemeToggle';

export default function TopNav() {
  return (
    <nav className="flex h-20 w-full items-center justify-between px-6">
      <Link href="/" className="text-2xl font-bold">
        DLOG
      </Link>
      <div className="">
        <ThemeToggle />
      </div>
    </nav>
  );
}
