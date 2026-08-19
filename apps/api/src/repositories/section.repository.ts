import { prisma } from "../db/prisma.js";

export async function findSectionsByProject(projectId: string){
return prisma.section.findMany({
  where: {
    projectId,
  },
});
}