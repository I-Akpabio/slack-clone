// import getCurrentUser from '@/app/actions/getCurrentUser';

import getUsers from "@/app/actions/getUsers";
// import DesktopSidebar from './DesktopSidebar';
// import MobileFooter from './MobileFooter';

async function Sidebar({ children }: { children: React.ReactNode }) {
  const users = await getUsers();

  console.log(users)
  // const currentUser = await getCurrentUser();

  return <>{children}</>;
}

export default Sidebar;