import type { Project } from "../model/types";

export const mockedProjects: Project[] = Array.from({length: 24}, (_, i) => ({
  id: i.toString(),
  name: `Проект ${i + 1}. Н. Проект ${i + 1}. Н. Проект ${i + 1}. Н. Проект ${i + 1}. Н.`,
  school: `ИШИТР`,
  status: 'pending'
}));