export enum TodoStatus {
  INPROGRESS = 'In Progress',
  COMPLETE = 'Complete',
}

export interface TodoType {
  id: string
  title: string
  status: TodoStatus
  dateCreated: number
  dateLastUpdated: number
}
