export interface Task {
  id: string
  content: {
    tasktitle: string
    taskdesc: string
    desclong: string
    date: string
    avatars: string[]
    badge: string[]
    attach: number
    comment: number
  }[]
}
[]

export interface ColumnsContent {
  id: string
  title: string
  color: string
  tasks: Task[]
}
[]

export interface Column {
  id: string
  title: string
  color: string
  tasks: Task[]
}
[]

export interface ColumnEditModalProps {
  isOpen: boolean
  onSave: () => void
  onClose: () => void
  handleClose: () => void
  handleSave: () => void
  columnName: string
  onColumnNameChange: (newName: string) => void
  handleTitleChange: (newTitle: string) => void
  handleColorChange: (selectedOption: { value: string; label: string } | null) => void
  editingColumn: { id: string; title: string; color: string } | null
  selectedColor: { value: string; label: string } | null
}
