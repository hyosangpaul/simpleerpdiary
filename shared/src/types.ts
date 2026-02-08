export interface User {
  id: string
  name: string
  email: string
}

export interface DiaryEntry {
  id: string
  userId: string
  title: string
  content: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

export interface ERPEntry {
  id: string
  type: 'task' | 'event' | 'note'
  title: string
  description: string
  dueDate?: Date
  completed: boolean
}
