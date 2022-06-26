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
  email: string | undefined
  name: string | undefined
}

declare module '@mui/material/styles' {
  interface Palette {
    customTheme: { [key: string]: string }
  }
  interface PaletteOptions {
    customTheme: {
      [key: string]: string
    }
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    custom: true
  }
}
