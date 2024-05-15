'use client';

import Image from 'next/image';
import Link from 'next/link';
import MenuIcon from '../icons/MenuIcon';
import { useEffect, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/img/icon.png" width={35} height={35} alt="logo" />
        <h1 className="font-medium text-xl tracking-tight">
          Animal Crossing Radio
        </h1>
      </Link>
      <nav className="hidden md:block">
        <ul className="flex gap-8">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/blog/latest">Latest</a>
          </li>
        </ul>
      </nav>
      <div onClick={() => setMenuOpen(true)} className="z-10 md:hidden">
        <MenuIcon />
      </div>
      <div
        className={`h-screen w-full fixed bg-gray-950/95 top-0 left-0 transition-all ${
          menuOpen ? 'opacity-100 z-20' : 'opacity-0 z-[-1]'
        }`}
      >
        <div
          className="right-5 top-5 absolute"
          onClick={() => setMenuOpen(false)}
        >
          <CloseIcon />
        </div>
        <nav className="h-full">
          <ul className="h-full flex flex-col items-center justify-center text-2xl gap-8">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/blog/latest">Latest</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
