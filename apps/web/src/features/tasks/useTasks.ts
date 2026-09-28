import { useQuery } from "@tanstack/react-query";

import { getTasks } from "./tasks-api";

export function useTasks(sectionId: string) {
  return useQuery({
    queryKey: ["tasks", sectionId],
    queryFn: () => getTasks(sectionId),
  });
}