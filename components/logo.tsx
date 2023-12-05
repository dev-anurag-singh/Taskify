import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';

import { cn } from '@/lib/utils';

const headingFont = localFont({
  src: '../public/fonts/font.woff2',
});

function Logo() {
  return (
    <Link href='/'>
      <div className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex'>
        <Image src='/logo.svg' alt='logo' height={30} width={30} />
        <p
          className={cn(
            'text-lg text-nutral-700 leading-none',
            headingFont.className
          )}
        >
          Taskify
        </p>
      </div>
    </Link>
  );
}

export default Logo;
