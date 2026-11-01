import React, { useState } from 'react';
import {
  Plus,
  UserPlus,
  LayoutGrid,
  Columns3,
  Sparkles,
} from 'lucide-react';
import type { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
  activeStatus: TaskStatus;
  setActiveStatus: (status: TaskStatus) => void;
  onOpenNewTask: (defaultStatus?: TaskStatus) => void;
  onOpenDetails: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onMoveStatus: (id: string, newStatus: TaskStatus) => void;
  onUpdateSubtask: (taskId: string, subtaskId: string, completed: boolean) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  activeStatus,
  setActiveStatus,
  onOpenNewTask,
  onOpenDetails,
  onDeleteTask,
  onMoveStatus,
}) => {
  const [viewMode, setViewMode] = useState<'tabs' | 'board'>('tabs');
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const statusConfigs: { id: TaskStatus; label: string }[] = [
    { id: 'todo', label: 'To Do' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'under-review', label: 'Under Review' },
    { id: 'completed', label: 'Completed' },
  ];

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedTaskId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (taskId) {
      onMoveStatus(taskId, targetStatus);
      setDraggedTaskId(null);
    }
  };

  const getTasksForStatus = (status: TaskStatus) => {
    return tasks.filter((t) => t.status === status);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Top Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">
            Workspace
          </span>
          <span>&gt;</span>
          <span className="hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">
            Ongoing Projects
          </span>
          <span>&gt;</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Taskly - Saas Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px]">Last Update on Sep 5, 2025 - 10:50 AM</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Member"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-gray-900"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Member"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-gray-900"
              />
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="Member"
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-gray-900"
              />
              <div className="w-7 h-7 rounded-full bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
                +6
              </div>
            </div>

            <button
              onClick={() => onOpenNewTask()}
              className="flex items-center gap-1 pl-3 pr-2.5 py-1 rounded-full bg-gray-950 dark:bg-white text-white dark:text-black text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer ml-1"
            >
              <span>Add</span>
              <UserPlus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Title & Pro Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white tracking-tight">
            Taskly - Saas Dashboard
          </h1>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3 h-3 text-purple-500" />
            <span>Pro member</span>
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 border border-gray-200/60 dark:border-gray-700 w-fit">
          <button
            onClick={() => setViewMode('tabs')}
            title="Tabbed focus view (Matches mockup)"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'tabs'
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Columns3 className="w-3.5 h-3.5" />
            <span>Focus Tab</span>
          </button>
          <button
            onClick={() => setViewMode('board')}
            title="All columns grid view"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              viewMode === 'board'
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Columns</span>
          </button>
        </div>
      </div>

      {/* Status Pills / Column Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {statusConfigs.map((col) => {
          const count = getTasksForStatus(col.id).length;
          const isActive = activeStatus === col.id;

          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer select-none border ${
                isActive
                  ? 'bg-gray-950 text-white dark:bg-white dark:text-gray-950 border-gray-950 dark:border-white shadow-sm'
                  : 'bg-white dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 border-gray-200/80 dark:border-gray-700 hover:border-gray-400'
              }`}
              onClick={() => setActiveStatus(col.id)}
            >
              <span>{col.label}</span>
              <span
                className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  isActive
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300'
                }`}
              >
                {count}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenNewTask(col.id);
                }}
                title={`Add task to ${col.label}`}
                className={`ml-0.5 p-0.5 rounded-full hover:scale-110 active:scale-95 transition-transform ${
                  isActive
                    ? 'text-gray-400 hover:text-white dark:hover:text-black'
                    : 'text-gray-400 hover:text-gray-700 dark:hover:text-white'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Task Cards Display */}
      {viewMode === 'tabs' ? (
        /* Spotlight tab view (Matches the image layout: 2 cards side-by-side or responsive grid) */
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, activeStatus)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-[320px] p-1 rounded-3xl"
        >
          {getTasksForStatus(activeStatus).length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white/50 dark:bg-gray-800/40 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                No tasks currently in this stage.
              </p>
              <button
                onClick={() => onOpenNewTask(activeStatus)}
                className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Task</span>
              </button>
            </div>
          ) : (
            getTasksForStatus(activeStatus).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onOpenDetails={onOpenDetails}
                onDeleteTask={onDeleteTask}
                onMoveStatus={onMoveStatus}
                onDragStart={handleDragStart}
              />
            ))
          )}
        </div>
      ) : (
        /* Full 4-Column Kanban Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 min-h-[400px]">
          {statusConfigs.map((col) => {
            const colTasks = getTasksForStatus(col.id);
            return (
              <div
                key={col.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
                className="bg-gray-50/70 dark:bg-gray-800/40 rounded-3xl p-3 border border-gray-200/50 dark:border-gray-700/50 flex flex-col"
              >
                <div className="flex items-center justify-between px-2 mb-3">
                  <span className="font-bold text-xs text-gray-700 dark:text-gray-300">
                    {col.label}
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 bg-white dark:bg-gray-700 px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-600">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onOpenDetails={onOpenDetails}
                      onDeleteTask={onDeleteTask}
                      onMoveStatus={onMoveStatus}
                      onDragStart={handleDragStart}
                    />
                  ))}
                  {colTasks.length === 0 && (
                    <div className="h-28 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
                      Drop cards here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
