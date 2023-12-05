import OrgControl from './_components/orgControl';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}

export default Layout;
