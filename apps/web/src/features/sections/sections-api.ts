import type {
  CreateSectionInput,
  Section,
  UpdateSectionInput,
} from "@orlune/shared";

import { api } from "../../lib/api";

export function getSections(projectId: string) {
  return api<Section[]>(`/projects/${projectId}/sections`);
}

export function createSection(
  projectId: string,
  input: CreateSectionInput,
) {
  return api<Section>(`/projects/${projectId}/sections`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateSection(
  sectionId: string,
  input: UpdateSectionInput,
) {
  return api<Section>(`/sections/${sectionId}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteSection(sectionId: string) {
  return api<void>(`/sections/${sectionId}`, {
    method: "DELETE",
  });
}