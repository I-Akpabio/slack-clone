import AppWithThread from "@/app/components/AppRoot/AppWithThread";

import getUsers from "@/app/actions/getUsers";

export default async function Home() {
  const users = await getUsers()
  return <AppWithThread users={users} channels={[]} />;
}
