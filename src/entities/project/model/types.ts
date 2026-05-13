export type ProjectStatus = "active" | "pending" | "closed" | "archive"

export type Project = {
  id: string,
  name: string,
  school: string,
  status: ProjectStatus
}

export type ProjectDto = {
  id: number
  name: string
  school: string
  status: ProjectStatus
}