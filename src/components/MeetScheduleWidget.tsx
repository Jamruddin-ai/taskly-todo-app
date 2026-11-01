import React, { useState } from 'react';
import {
  Monitor,
  Bell,
  ChevronDown,
  MoreHorizontal,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Settings,
  Calendar,
  Clock,
  Video as VideoIcon,
} from 'lucide-react';

interface MeetScheduleWidgetProps {
  onJoinMeet: () => void;
}

export const MeetScheduleWidget: React.FC<MeetScheduleWidgetProps> = ({
  onJoinMeet,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800/90 rounded-3xl p-5 border border-gray-100/80 dark:border-gray-700/80 shadow-xs flex flex-col justify-between transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">
            Meet Schedule
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-gray-400">
          <button className="p-1 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="p-1 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Preview Card */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-gray-900 shadow-inner group">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
          alt="Daily Scrum Preview"
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isVideoOff ? 'opacity-20' : 'opacity-90'
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md">
            Preview
          </span>
        </div>

        <button className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-full bg-black/30 backdrop-blur-md">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>

        {/* Video controls overlay */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 z-10">
          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isMuted
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md'
                : 'bg-black/60 hover:bg-black/80 text-white backdrop-blur-md'
            }`}
          >
            {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            title={isVideoOff ? 'Turn camera on' : 'Turn camera off'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isVideoOff
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md'
                : 'bg-black/60 hover:bg-black/80 text-white backdrop-blur-md'
            }`}
          >
            {isVideoOff ? <VideoOff className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
          </button>

          <button
            title="Meeting settings"
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Footer Info & CTA */}
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">
            <span>Daily Scrum</span>
            <span>👏</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              Sep 12
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              10:00 - 10:15
            </span>
          </div>
        </div>

        <button
          onClick={onJoinMeet}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-all active:scale-95"
        >
          <span>Join Meet</span>
          <VideoIcon className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};
