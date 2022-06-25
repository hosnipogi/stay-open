export enum TodoStatus {
  INPROGRESS = 'INPROGRESS',
  COMPLETE = 'COMPLETE',
}

export interface TodoType {
  id: string
  title: string
  status: TodoStatus
  dateCreated: number
  dateLastUpdated: number
}

export interface IUser {
  email: string
  name: string
}
