import Provider from '@/components/Provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Provider>
        <Toaster position='bottom-center' toastOptions={{ duration: 3000 }} />
        {children}
      </Provider>
    </ClerkProvider>
  );
}

export default Layout;
