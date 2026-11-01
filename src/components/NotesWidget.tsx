import React, { useState } from 'react';
import { BookOpen, Edit2, Check } from 'lucide-react';

export const NotesWidget: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(
    'Revamp Sidebar & Update before Sep 14 🔥'
  );

  return (
    <div className="widget-gradient-notes rounded-3xl p-5 text-gray-900 dark:text-white flex flex-col justify-between h-[155px] shadow-sm relative overflow-hidden group">
      {/* Background glow circle */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/25 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-black/10 dark:bg-white/10 rounded-xl backdrop-blur-xs">
            <BookOpen className="w-4 h-4 text-gray-900 dark:text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight">Notes</span>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          title={isEditing ? 'Save note' : 'Edit note'}
          className="p-1 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
        >
          {isEditing ? (
            <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
          ) : (
            <Edit2 className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
          )}
        </button>
      </div>

      {/* Note Body */}
      <div className="z-10 my-1">
        {isEditing ? (
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            rows={2}
            className="w-full text-xs font-semibold bg-white/70 dark:bg-black/30 rounded-lg p-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/40 resize-none border-none"
            autoFocus
          />
        ) : (
          <p className="text-sm font-bold tracking-tight leading-snug line-clamp-2">
            {noteContent}
          </p>
        )}
      </div>

      {/* Footer Tag */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-gray-700/80 dark:text-gray-300 z-10">
        <span>Today</span>
        <span className="text-[10px] text-gray-600/70 dark:text-gray-400">
          Auto-saved
        </span>
      </div>
    </div>
  );
};
