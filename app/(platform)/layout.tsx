import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Toaster position='bottom-center' toastOptions={{ duration: 3000 }} />
      {children}
    </ClerkProvider>
  );
}

export default Layout;
