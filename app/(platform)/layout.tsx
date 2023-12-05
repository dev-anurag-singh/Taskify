import { ClerkProvider } from '@clerk/nextjs';

function Layout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default Layout;
