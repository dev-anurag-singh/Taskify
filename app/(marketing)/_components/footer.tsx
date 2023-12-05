import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Footer() {
  return (
    <div className='fixed bottom-0 border-t w-full p-4 border-b bg-white'>
      <div className='md:max-w-screen-lg mx-auto flex items-center w-full justify-between'>
        <Logo />
        <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
          <Button size='sm' variant='ghost'>
            Privacy Policy
          </Button>
          <Button size='sm' variant='ghost'>
            Terms of service
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
