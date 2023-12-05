import Navbar from './_components/navbar';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen'>
      <Navbar />
      {children}
    </div>
  );
}

export default DashboardLayout;
