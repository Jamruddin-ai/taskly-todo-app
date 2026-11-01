import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { KanbanBoard } from './components/KanbanBoard';
import { CalendarWidget } from './components/CalendarWidget';
import { TimerWidget } from './components/TimerWidget';
import { NotesWidget } from './components/NotesWidget';
import { MeetScheduleWidget } from './components/MeetScheduleWidget';
import { DesignTeamChatWidget } from './components/DesignTeamChatWidget';
import { TaskModal } from './components/TaskModal';
import { VideoMeetingModal } from './components/VideoMeetingModal';
import type { Task, TaskStatus, ChatMessage } from './types';
import { INITIAL_TASKS, INITIAL_CHAT } from './data/mockData';

export function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('taskly_theme') === 'dark';
  });

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('taskly_tasks_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_TASKS;
  });

  // Chat messages state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('taskly_chat_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CHAT;
  });

  // Navigation & filter state
  const [activeView, setActiveView] = useState('dashboard');
  const [activeProject, setActiveProject] = useState('taskly-saas');
  const [activeStatus, setActiveStatus] = useState<TaskStatus>('todo');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [defaultTaskStatus, setDefaultTaskStatus] = useState<TaskStatus>('todo');
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);

  // Sync dark mode class with HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('taskly_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('taskly_theme', 'light');
    }
  }, [darkMode]);

  // Persist tasks
  useEffect(() => {
    localStorage.setItem('taskly_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  // Persist chat
  useEffect(() => {
    localStorage.setItem('taskly_chat_v2', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Keyboard shortcut listener: Cmd/Ctrl + S triggers new task modal or focuses search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setIsTaskModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter tasks by search query and calendar selection
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedDate !== null) {
      // If a date is selected in the mini calendar, filter or highlight matching dates
      // e.g. "Sep 14" matches 14
      const dueNumber = parseInt(task.dueDate.replace(/\D/g, ''), 10);
      if (!isNaN(dueNumber) && dueNumber !== selectedDate) {
        return false;
      }
    }

    return true;
  });

  const handleOpenNewTask = (status?: TaskStatus) => {
    setTaskToEdit(null);
    setDefaultTaskStatus(status || activeStatus);
    setIsTaskModalOpen(true);
  };

  const handleOpenDetails = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (savedTask: Task) => {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === savedTask.id);
      if (exists) {
        return prev.map((t) => (t.id === savedTask.id ? savedTask : t));
      } else {
        return [savedTask, ...prev];
      }
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleMoveStatus = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (newStatus === 'completed' && t.status !== 'completed') {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981'],
            });
          }
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
  };

  const handleUpdateSubtask = (
    taskId: string,
    subtaskId: string,
    completed: boolean
  ) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            subtasks: t.subtasks.map((st) =>
              st.id === subtaskId ? { ...st, completed } : st
            ),
          };
        }
        return t;
      })
    );
  };

  const handleSendMessage = (text: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Brenda',
      text,
      timestamp: timeStr,
      isMe: true,
      status: 'read',
    };

    setChatMessages((prev) => [...prev, newMsg]);

    // Optional simulated smart reply from teammate Michie after 2 seconds
    if (text.toLowerCase().includes('scrum') || text.toLowerCase().includes('meeting') || text.toLowerCase().includes('update')) {
      setTimeout(() => {
        const autoReply: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'Michie',
          avatar:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          text: 'Got it, let us review that during our daily sync! 🚀',
          timestamp: timeStr,
          isMe: false,
        };
        setChatMessages((prev) => [...prev, autoReply]);
      }, 1500);
    }
  };

  const handleSelectDate = (day: number) => {
    if (selectedDate === day) {
      setSelectedDate(null); // toggle off
    } else {
      setSelectedDate(day);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] dark:bg-[#0c0e15] flex flex-col transition-colors selection:bg-purple-500 selection:text-white">
      {/* Top Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNewTask={() => handleOpenNewTask()}
      />

      {/* Main Body with Sidebar & Dashboard Content */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto p-3 sm:p-5 gap-5">
        {/* Left Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            activeView={activeView}
            setActiveView={setActiveView}
            activeProject={activeProject}
            setActiveProject={setActiveProject}
            onNewProject={() => handleOpenNewTask()}
          />
        </div>

        {/* Dashboard Grid Container (Center Main + Right Column) */}
        <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          {/* Center Column: Kanban Board (top) + Bottom Widgets (Meet & Chat) */}
          <div className="xl:col-span-8 space-y-6">
            {/* Main Kanban Board Card */}
            <div className="bg-white/90 dark:bg-gray-900/80 rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-gray-800 shadow-sm backdrop-blur-sm">
              <KanbanBoard
                tasks={filteredTasks}
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
                onOpenNewTask={handleOpenNewTask}
                onOpenDetails={handleOpenDetails}
                onDeleteTask={handleDeleteTask}
                onMoveStatus={handleMoveStatus}
                onUpdateSubtask={handleUpdateSubtask}
              />
            </div>

            {/* Bottom Row Widgets: Meet Schedule & Design Team Chat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <MeetScheduleWidget
                onJoinMeet={() => setIsMeetingModalOpen(true)}
              />
              <DesignTeamChatWidget
                messages={chatMessages}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>

          {/* Right Column: Calendar Widget + Timer & Notes Widgets */}
          <div className="xl:col-span-4 space-y-5">
            {/* Calendar Widget */}
            <CalendarWidget
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />

            {/* Timer Widget */}
            <TimerWidget />

            {/* Notes Widget */}
            <NotesWidget />
          </div>
        </main>
      </div>

      {/* Task Creation & Edit Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        taskToEdit={taskToEdit}
        defaultStatus={defaultTaskStatus}
        onSaveTask={handleSaveTask}
      />

      {/* Live Video Meeting Simulated Modal */}
      <VideoMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
      />
    </div>
  );
}

export default App;
