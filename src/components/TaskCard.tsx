import React from 'react';
import {
  Flame,
  Clock,
  MoreHorizontal,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  Trash2,
  ChevronRight,
  Edit3,
} from 'lucide-react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onOpenDetails: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onMoveStatus: (id: string, newStatus: Task['status']) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onOpenDetails,
  onDeleteTask,
  onMoveStatus,
  onDragStart,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const completedSubtasks = task.subtasks.filter((st) => st.completed).length;
  const totalSubtasks = task.subtasks.length;

  const getPriorityBadge = () => {
    switch (task.priority) {
      case 'urgent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500 text-white text-[11px] font-bold shadow-xs">
            <Flame className="w-3 h-3 fill-white" />
            <span>Urgent</span>
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-[11px] font-bold">
            <Flame className="w-3 h-3" />
            <span>High Priority</span>
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Medium</span>
          </span>
        );
      case 'low':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[11px] font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>Low Priority</span>
          </span>
        );
    }
  };

  const getNextStatus = (current: Task['status']): Task['status'] => {
    if (current === 'todo') return 'in-progress';
    if (current === 'in-progress') return 'under-review';
    if (current === 'under-review') return 'completed';
    return 'todo';
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white dark:bg-gray-800/95 rounded-3xl p-5 border border-gray-100/90 dark:border-gray-700/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing flex flex-col justify-between group relative select-none"
    >
      <div>
        {/* Badges & Actions Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center flex-wrap gap-2">
            {getPriorityBadge()}

            {task.dueDate && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500 text-white text-[11px] font-bold shadow-xs">
                <Clock className="w-3 h-3" />
                <span>Due {task.dueDate.replace(/^Due\s*/i, '')}</span>
              </span>
            )}
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              title="Task options"
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-7 w-44 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-1.5 z-20 text-xs animate-in fade-in zoom-in-95 duration-100"
              >
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenDetails(task);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center gap-2"
                >
                  <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                  <span>Edit Details</span>
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onMoveStatus(task.id, getNextStatus(task.status));
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center gap-2"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-purple-500" />
                  <span>Advance Status</span>
                </button>
                <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDeleteTask(task.id);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Task</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Task Title & Description */}
        <div
          onClick={() => onOpenDetails(task)}
          className="cursor-pointer space-y-1.5"
        >
          <h4 className="font-bold text-base text-gray-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {task.title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
            {task.description}
          </p>
        </div>

        {/* Assignees avatars stack */}
        <div className="flex items-center gap-1.5 mt-4">
          <div className="flex -space-x-2">
            {task.assignees.slice(0, 3).map((u, i) => (
              <img
                key={u.id || i}
                src={u.avatar}
                alt={u.name}
                title={u.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
              />
            ))}
          </div>
          {task.assignees.length > 3 && (
            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 pl-1">
              +{task.assignees.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Divider & Metadata */}
      <div className="mt-4 pt-3.5 border-t border-gray-100/90 dark:border-gray-700/80 flex items-center justify-between text-xs text-gray-400 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <div
            title={`${task.commentsCount} comments`}
            className="flex items-center gap-1 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">{task.commentsCount}</span>
          </div>

          <div
            title={`${task.attachmentsCount} attachments`}
            className="flex items-center gap-1 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <Paperclip className="w-3.5 h-3.5 rotate-45" />
            <span className="text-[11px] font-medium">{task.attachmentsCount}</span>
          </div>
        </div>

        <div
          title={`${completedSubtasks} of ${totalSubtasks} subtasks completed`}
          className="flex items-center gap-1 font-medium text-gray-500 dark:text-gray-400"
        >
          <CheckCircle2
            className={`w-3.5 h-3.5 ${
              completedSubtasks === totalSubtasks && totalSubtasks > 0
                ? 'text-emerald-500'
                : 'text-gray-400'
            }`}
          />
          <span className="text-[11px]">
            {completedSubtasks}/{totalSubtasks}
          </span>
        </div>
      </div>
    </div>
  );
};
