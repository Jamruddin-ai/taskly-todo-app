export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'under-review' | 'completed';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignees: Assignee[];
  commentsCount: number;
  attachmentsCount: number;
  subtasks: Subtask[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar?: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  previewImage: string;
  isMicMuted: boolean;
  isVideoOff: boolean;
}
