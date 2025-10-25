import React from 'react';
import { Save, Upload, Download, Undo, Redo, Menu, Share, PanelRightClose, PanelRightOpen, LogOut } from 'lucide-react';
import cookies from "js-cookie"
import { useRouter } from 'next/navigation';
interface HeaderProps {
  onClearCanvas: () => void;
  isPropertiesPanelVisible: boolean;
  onTogglePropertiesPanel: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onClearCanvas,
  isPropertiesPanelVisible,
  onTogglePropertiesPanel
}) => {
  const nav = useRouter()
  const onClickLogout = () => {
    cookies.remove("jwt_token")
    nav.push("/")
  }
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="font-semibold text-gray-900"></span>
        </div>

        <div className="h-6 w-px bg-gray-300" />

        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Save className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Upload className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Download className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-300" />

        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Undo className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Redo className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onTogglePropertiesPanel}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title={isPropertiesPanelVisible ? 'Hide Properties Panel' : 'Show Properties Panel'}
        >
          {isPropertiesPanelVisible ? (
            <PanelRightClose className="w-4 h-4 text-gray-600" />
          ) : (
            <PanelRightOpen className="w-4 h-4 text-gray-600" />
          )}
        </button>

        <button
          onClick={onClearCanvas}
          className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          Clear Canvas
        </button>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Share className="w-4 h-4" />
          Share
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors flex items-center gap-2" onClick={onClickLogout}>
          <LogOut className="w-4 h-4" />
          Logout
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden">
          <Menu className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </header>
  );
};