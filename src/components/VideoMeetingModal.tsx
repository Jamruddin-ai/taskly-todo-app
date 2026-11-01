import React, { useState } from 'react';
import {
  X,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
} from 'lucide-react';

interface VideoMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoMeetingModal: React.FC<VideoMeetingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-gray-900 text-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-gray-800 flex flex-col justify-between max-h-[90vh]">
        {/* Top meeting bar */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <div>
              <h3 className="font-bold text-base flex items-center gap-1.5">
                <span>Daily Scrum</span>
                <span>👏</span>
              </h3>
              <p className="text-xs text-gray-400">10:00 - 10:15 • 5 participants</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Feeds Grid */}
        <div className="grid grid-cols-2 gap-3 my-4 flex-1 min-h-[300px]">
          {/* Main Speaker */}
          <div className="relative rounded-2xl overflow-hidden bg-black/60 aspect-video col-span-2 sm:col-span-1">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
              alt="Speaker Michie"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 text-xs backdrop-blur-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Michie Sato (Host)</span>
            </div>
          </div>

          {/* User Self Feed */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-800 aspect-video col-span-2 sm:col-span-1 flex items-center justify-center">
            {!videoOff ? (
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80"
                alt="Brenda"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <VideoOff className="w-8 h-8 text-gray-500" />
                <span className="text-xs">Camera is off</span>
              </div>
            )}
            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/60 text-xs backdrop-blur-md flex items-center gap-1.5">
              <span>Brenda (You)</span>
              {micMuted && <MicOff className="w-3 h-3 text-rose-400" />}
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-center gap-3 pt-3 border-t border-gray-800">
          <button
            onClick={() => setMicMuted(!micMuted)}
            className={`p-3 rounded-full transition-all ${
              micMuted ? 'bg-rose-600 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            {micMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setVideoOff(!videoOff)}
            className={`p-3 rounded-full transition-all ${
              videoOff ? 'bg-rose-600 text-white' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            }`}
          >
            {videoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            title="Leave call"
            className="px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-2 shadow-lg shadow-rose-600/30"
          >
            <PhoneOff className="w-5 h-5" />
            <span className="text-xs">End Call</span>
          </button>
        </div>
      </div>
    </div>
  );
};
