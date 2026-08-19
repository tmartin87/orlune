import { findSectionsByProject } from "../repositories/section.repository.js";


export async function getSectionsByProject(projectId: string) {
  return findSectionsByProject(projectId);
}