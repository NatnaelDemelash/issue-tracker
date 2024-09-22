'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoBug } from 'react-icons/io5';

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  return (
    <nav className="flex items-center h-14 px-4 space-x-6 mb-6 border-b">
      <Link href="/">
        <IoBug size={20} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              link.href === currentPath
                ? 'text-[#dc7633] font-semibold'
                : 'text-zinc-500'
            } transition-colors hover:text-zinc-800`}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
