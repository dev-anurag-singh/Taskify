'use client';

import { Button } from '@/components/ui/button';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import Sidebar from './sidebar';

function MobileSidebar() {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useMobileSidebar();

  //   const [isMounted, setIsMounted] = useState(false);

  //   useEffect(() => {
  //     setIsMounted(true);
  //   }, []);

  //   if(!isMounted){
  //     return null;
  //   }

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      <Button
        onClick={onOpen}
        className='block md:hidden'
        variant='ghost'
        size='sm'
      >
        <Menu className='h-4 w-4' />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side='left' className='p-2 pt-10'>
          <Sidebar storageKey='t-sidebar-mobile-state' />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default MobileSidebar;
