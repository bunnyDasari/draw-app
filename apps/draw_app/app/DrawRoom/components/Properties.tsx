import React from 'react';
import { Palette, Minus, Plus } from 'lucide-react';
import { StrokeWidth } from '../types';

interface PropertiesProps {
  isVisible: boolean;
  strokeColor: string;
  fillColor: string;
  strokeWidth: StrokeWidth;
  onStrokeColorChange: (color: string) => void;
  onFillColorChange: (color: string) => void;
  onStrokeWidthChange: (width: StrokeWidth) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  isGridVisible: boolean;
  onToggleGrid: () => void;
}

const colors = [
  '#000000', '#e03131', '#2f9e44', '#1971c2', '#f08c00', '#7048e8', '#c2255c', '#495057'
];

const strokeWidths: StrokeWidth[] = [1, 2, 4, 8];

export const Properties: React.FC<PropertiesProps> = ({
  isVisible,
  strokeColor,
  fillColor,
  strokeWidth,
  onStrokeColorChange,
  onFillColorChange,
  onStrokeWidthChange,
  zoom,
  onZoomChange,
  isGridVisible,
  onToggleGrid,
}) => {
  if (!isVisible) return null;

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4 space-y-6 overflow-y-auto transition-all duration-300">
      {/* Colors Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Colors</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-600">Stroke</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <button
                  key={`stroke-${color}`}
                  onClick={() => onStrokeColorChange(color)}
                  className={`
                    w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110
                    ${strokeColor === color ? 'border-blue-500 shadow-lg' : 'border-gray-300'}
                  `}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded border border-gray-400" />
              <span className="text-xs text-gray-600">Fill</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => onFillColorChange('transparent')}
                className={`
                  w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 bg-white relative
                  ${fillColor === 'transparent' ? 'border-blue-500 shadow-lg' : 'border-gray-300'}
                `}
              >
                <div className="absolute inset-1 border border-red-400 bg-red-50 rounded opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-px bg-red-400 transform rotate-45" />
                </div>
              </button>
              {colors.map((color) => (
                <button
                  key={`fill-${color}`}
                  onClick={() => onFillColorChange(color)}
                  className={`
                    w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110
                    ${fillColor === color ? 'border-blue-500 shadow-lg' : 'border-gray-300'}
                  `}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stroke Width Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Stroke Width</h3>
        <div className="space-y-2">
          {strokeWidths.map((width) => (
            <button
              key={width}
              onClick={() => onStrokeWidthChange(width)}
              className={`
                w-full p-3 rounded-lg border transition-all duration-200 flex items-center justify-between
                ${strokeWidth === width 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <span className="text-sm text-gray-700">{width}px</span>
              <div 
                className="bg-gray-800 rounded-full"
                style={{ width: `${Math.max(width, 2)}px`, height: `${Math.max(width, 2)}px` }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* View Controls */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">View</h3>
        
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 block mb-2">Zoom: {Math.round(zoom * 100)}%</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onZoomChange(zoom - 0.1)}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 text-center text-sm text-gray-700 py-2">
                {Math.round(zoom * 100)}%
              </div>
              <button
                onClick={() => onZoomChange(zoom + 0.1)}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={onToggleGrid}
            className={`
              w-full p-3 rounded-lg border transition-all duration-200 text-left
              ${isGridVisible 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }
            `}
          >
            Show Grid
          </button>
        </div>
      </div>
    </div>
  );
};