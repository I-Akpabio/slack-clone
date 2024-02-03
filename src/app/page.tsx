import { TimeIcon } from "./components/Icon";
import Sidebar from "./components/SideBar/SideBar";
import AppRoot from "./components/AppRoot/AppRoot";
import getUsers from "@/app/actions/getUsers";
import getChannels from "./actions/getChannels";
import getConversationById from "./actions/getConversationById";

export default async function Home() {
  const users = await getUsers();
  const channels = await getChannels();

  console.log(channels)
  return (
    <main className="">
      <nav>
        <div className="grid grid-cols-10 py-2">
          <div className="col-span-2">
            <div className="flex justify-end pr-5 pt-2">
              <TimeIcon />
            </div>
          </div>
          <div className="col-span-8">
            <div className="flex justify-between pr-4">
              <div className="search-container">
                <input
                  type="text"
                  name=""
                  id=""
                  className="p-1"
                  placeholder="Search Company"
                />
              </div>

              <img src="profile3.png" />
            </div>
          </div>
        </div>
      </nav>

      <AppRoot users={users} channels={channels} />
    </main>
  );
}
