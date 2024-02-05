import { TimeIcon } from "@/app/components/Icon"
import { User } from "@prisma/client"
import Avatar from "./Avatar"

const Nav = ({currentUser}:{currentUser: User}) => (<nav>
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

        <Avatar text={currentUser.name[0]} size="medium" />
      </div>
    </div>
  </div>
</nav>
)


export default Nav