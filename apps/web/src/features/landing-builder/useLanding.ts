import { useQuery } from "@tanstack/react-query";

import { getLanding } from "./landing-api";

export function useLanding(projectId: string) {
  return useQuery({
    queryKey: ["landing", projectId],
    queryFn: () => getLanding(projectId),
  });
}