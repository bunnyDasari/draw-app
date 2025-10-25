export type Tool = 
  | 'select'
  | 'rectangle' 
  | 'circle'
  | 'arrow'
  | 'line'
  | 'text'
  | 'pen'
  | 'eraser';

export type StrokeWidth = 1 | 2 | 4 | 8;

export type Element = {
  id: string;
  type: Tool;
  x: number;
  y: number;
  width: number;
  height: number;
  strokeColor: string;
  fillColor: string;
  strokeWidth: StrokeWidth;
  text?: string;
};

export type AppState = {
  currentTool: Tool;
  strokeColor: string;
  fillColor: string;
  strokeWidth: StrokeWidth;
  elements: Element[];
  selectedElementIds: string[];
  zoom: number;
  panX: number;
  panY: number;
  isGridVisible: boolean;
  isPropertiesPanelVisible: boolean;
};