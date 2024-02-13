import { usePathname } from "next/navigation";
import { useMemo } from "react";
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();

  const { conversationId } = useConversation();
};
