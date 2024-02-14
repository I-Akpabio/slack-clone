import Profile from "./components/ProfilePage";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function ProfileRoot (props:any) {
  const currentUser = await getCurrentUser()
  return <Profile currentUser={currentUser} test={props} />

};
