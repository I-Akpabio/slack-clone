// import getCurrentUser from '@/app/actions/getCurrentUser';

import getUsers from "@/app/actions/getUsers";
// import DesktopSidebar from './DesktopSidebar';
// import MobileFooter from './MobileFooter';

async function Sidebar({ children }: { children?: React.ReactNode }) {
  const users = await getUsers();

  
  // const currentUser = await getCurrentUser();

  return <>{users.map((user)=> <>{user.name}</>)}</>;
}

export default Sidebar;
