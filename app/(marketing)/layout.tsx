import Footer from './_components/footer';
import Navbar from './_components/navbar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen bg-slate-100'>
      <Navbar />
      <main className='pt-40 pb-20 bg-slate-100'>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
