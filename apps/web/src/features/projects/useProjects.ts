import { useQuery } from "@tanstack/react-query";

import { getProjects } from "./projects-api";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
}