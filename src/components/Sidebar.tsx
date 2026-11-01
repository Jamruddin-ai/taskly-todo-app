import React, { useState } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Users,
  FileBarChart,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  Lock,
  ChevronsUpDown,
  FolderOpen,
  Briefcase,
  Layers,
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  activeProject: string;
  setActiveProject: (project: string) => void;
  onNewProject: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  activeProject,
  setActiveProject,
  onNewProject,
}) => {
  const [ongoingProjectsOpen, setOngoingProjectsOpen] = useState(true);
  const [dailyTasksOpen, setDailyTasksOpen] = useState(false);
  const [dribbbleShotsOpen, setDribbbleShotsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'task-overview', label: 'Task Overview', icon: CheckSquare, badge: 4 },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: 2 },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'reports', label: 'Report Summary', icon: FileBarChart, badge: 5 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between p-4 border-r border-gray-100 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md select-none transition-colors">
      <div className="space-y-6">
        {/* Team Switcher Card */}
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-gray-50/80 dark:bg-gray-800/70 border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer transition-all shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm shadow-xs">
              M
            </div>
            <div>
              <div className="font-semibold text-xs tracking-tight text-gray-900 dark:text-white">
                Milesto Team
              </div>
              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <Lock className="w-3 h-3 text-gray-400" />
                <span>Private</span>
              </div>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Menu Section */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            <span>Menu</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gray-950 text-white dark:bg-white dark:text-gray-950 shadow-md shadow-black/10'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-black' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-purple-500 text-white'
                          : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Workspace Section */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            <span>Workspace</span>
            <button
              onClick={onNewProject}
              title="Add new project"
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            {/* Ongoing Projects Folder */}
            <div>
              <div
                onClick={() => setOngoingProjectsOpen(!ongoingProjectsOpen)}
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {ongoingProjectsOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  )}
                  <FolderOpen className="w-3.5 h-3.5 text-gray-500" />
                  <span>Ongoing Projects</span>
                </div>
                <span className="w-4 h-4 rounded-full bg-black text-white dark:bg-gray-700 text-[10px] flex items-center justify-center font-bold">
                  2
                </span>
              </div>

              {ongoingProjectsOpen && (
                <div className="pl-6 pr-1 space-y-1 mt-1">
                  <button
                    onClick={() => setActiveProject('neura-mobile')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all ${
                      activeProject === 'neura-mobile'
                        ? 'glow-sidebar-item font-semibold text-purple-900 dark:text-purple-100'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/40'
                    }`}
                  >
                    Neura Mobile Responsive
                  </button>

                  <button
                    onClick={() => setActiveProject('taskly-saas')}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all ${
                      activeProject === 'taskly-saas'
                        ? 'glow-sidebar-item font-semibold text-purple-900 dark:text-purple-100'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/40'
                    }`}
                  >
                    Taskly - Saas Dashboard
                  </button>
                </div>
              )}
            </div>

            {/* Daily Tasks */}
            <div
              onClick={() => setDailyTasksOpen(!dailyTasksOpen)}
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {dailyTasksOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                )}
                <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                <span>Daily Tasks</span>
              </div>
              <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-1.5 py-0.5 rounded-full">
                6
              </span>
            </div>

            {/* Dribbble Shots */}
            <div
              onClick={() => setDribbbleShotsOpen(!dribbbleShotsOpen)}
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {dribbbleShotsOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                )}
                <Layers className="w-3.5 h-3.5 text-rose-500" />
                <span>Dribbble Shots</span>
              </div>
              <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-1.5 py-0.5 rounded-full">
                3
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-purple-50/70 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900/50 text-xs">
        <div className="font-semibold text-purple-900 dark:text-purple-200 mb-1">
          Milesto Pro Plan
        </div>
        <p className="text-[11px] text-purple-700/80 dark:text-purple-300/80 mb-2">
          Unlimited workspaces and smart time tracking enabled.
        </p>
      </div>
    </aside>
  );
};
