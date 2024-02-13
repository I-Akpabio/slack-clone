import { useParams } from "next/navigation";

const CONVERSATION = 0;
const THREAD = 1;
const PROFILE = 2;

export default function useUrl() {
  const params = useParams();

  const getUrl = (page: number, param: string) => {
    switch (page) {
      case CONVERSATION:
        return `/${params.conversationId}`;
      case PROFILE:
        return `/${params.conversationId}/profile/${param}`;
      case THREAD:
        return `/${params.conversationId}/thread/${param}`;
      default:
        return `/${params.conversationId}`;
    }
  };

  return {
    CONVERSATION,
    THREAD,
    PROFILE,
    getUrl,
  };
}
