import { useQuery } from "@tanstack/react-query";

import { getSections } from "./sections-api";

export function useSections(projectId: string | undefined) {
  return useQuery({
    queryKey: ["sections", projectId],
    queryFn: () => getSections(projectId!),
    enabled: projectId !== undefined,
  });
}