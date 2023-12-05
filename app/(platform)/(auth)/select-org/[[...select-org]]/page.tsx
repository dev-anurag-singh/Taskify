import { OrganizationList } from '@clerk/nextjs';
function Page() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={'/organization/:id'}
      afterCreateOrganizationUrl={'/organization/:id'}
    />
  );
}

export default Page;
