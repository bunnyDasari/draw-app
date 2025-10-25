import React from 'react';
import { 
  MousePointer, 
  Square, 
  Circle, 
  ArrowRight, 
  Minus, 
  Type, 
  Pen,
  Eraser
} from 'lucide-react';
import { Tool } from '../types';

interface SidebarProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
}

const tools = [
  { id: 'select' as Tool, icon: MousePointer, label: 'Select', shortcut: 'V' },
  { id: 'rectangle' as Tool, icon: Square, label: 'Rectangle', shortcut: 'R' },
  { id: 'circle' as Tool, icon: Circle, label: 'Circle', shortcut: 'O' },
  { id: 'arrow' as Tool, icon: ArrowRight, label: 'Arrow', shortcut: 'A' },
  { id: 'line' as Tool, icon: Minus, label: 'Line', shortcut: 'L' },
  { id: 'text' as Tool, icon: Type, label: 'Text', shortcut: 'T' },
  { id: 'pen' as Tool, icon: Pen, label: 'Draw', shortcut: 'P' },
  { id: 'eraser' as Tool, icon: Eraser, label: 'Eraser', shortcut: 'E' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentTool, onToolChange }) => {
  return (
    <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 gap-2">
      {tools.map(({ id, icon: Icon, label, shortcut }) => (
        <button
          key={id}
          onClick={() => onToolChange(id)}
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group relative
            ${currentTool === id 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow-sm'
            }
          `}
          title={`${label} (${shortcut})`}
        >
          <Icon className="w-5 h-5" />
          
          {/* Tooltip */}
          <div className="absolute left-14 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {label} ({shortcut})
          </div>
        </button>
      ))}

      <div className="flex-1" />

      {/* Additional controls at bottom */}
      <div className="w-10 h-px bg-gray-300 my-2" />
      
      <button className="w-12 h-12 rounded-xl bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow-sm transition-all duration-200 flex items-center justify-center group relative">
        <div className="w-4 h-4 border-2 border-current rounded" />
        <div className="absolute left-14 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          Library
        </div>
      </button>
    </div>
  );
};