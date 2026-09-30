import { useQuery } from "@tanstack/react-query";

import { getPublishedLanding } from "./public-landing-api";

export function usePublishedLanding(projectId: string) {
  return useQuery({
    queryKey: ["published-landing", projectId],
    queryFn: () => getPublishedLanding(projectId),
    retry: false,
  });
}