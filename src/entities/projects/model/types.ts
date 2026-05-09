export type Project = {
  id: string,
  name: string,
  school: string,
  status: ProjectStatus
}

export type ProjectStatus = "active" | "pending" | "closed" | "archive"