import React from 'react';
import { Eye, EyeOff, Grid } from 'lucide-react';

interface StatusBarProps {
  elementCount: number;
  selectedCount: number;
  zoom: number;
  isGridVisible: boolean;
  onToggleGrid: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  elementCount,
  selectedCount,
  zoom,
  isGridVisible,
  onToggleGrid,
}) => {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between text-sm text-gray-600">
      <div className="flex items-center gap-6">
        <div>
          Elements: <span className="font-medium text-gray-900">{elementCount}</span>
        </div>
        {selectedCount > 0 && (
          <div>
            Selected: <span className="font-medium text-gray-900">{selectedCount}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onToggleGrid}
          className={`
            flex items-center gap-1 px-2 py-1 rounded transition-colors
            ${isGridVisible 
              ? 'text-blue-600 hover:bg-blue-50' 
              : 'text-gray-500 hover:bg-gray-100'
            }
          `}
        >
          <Grid className="w-4 h-4" />
          {isGridVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {/* Reset zoom */}}
            className="px-2 py-1 hover:bg-gray-100 rounded transition-colors"
          >
            {Math.round(zoom * 100)}%
          </button>
        </div>

        <div className="text-gray-400">
          Ready
        </div>
      </div>
    </div>
  );
};