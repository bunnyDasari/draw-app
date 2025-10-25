'use client'
import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/canvas';
import { Properties } from './components/Properties';
import { StatusBar } from './components/StatusBar';
import { useDrawing } from './components/hooks';

function DrawRoom() {
    const {
        appState,
        setCurrentTool,
        setStrokeColor,
        setFillColor,
        setStrokeWidth,
        setZoom,
        toggleGrid,
        clearCanvas,
        togglePropertiesPanel,
    } = useDrawing();

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            switch (e.key.toLowerCase()) {
                case 'v':
                    setCurrentTool('select');
                    break;
                case 'r':
                    setCurrentTool('rectangle');
                    break;
                case 'o':
                    setCurrentTool('circle');
                    break;
                case 'a':
                    setCurrentTool('arrow');
                    break;
                case 'l':
                    setCurrentTool('line');
                    break;
                case 't':
                    setCurrentTool('text');
                    break;
                case 'p':
                    setCurrentTool('pen');
                    break;
                case 'e':
                    setCurrentTool('eraser');
                    break;
                case 'g':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        toggleGrid();
                    }
                    break;
                case '=':
                case '+':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        setZoom(appState.zoom + 0.1);
                    }
                    break;
                case '-':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        setZoom(appState.zoom - 0.1);
                    }
                    break;
                case '0':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        setZoom(1);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [appState.zoom, setCurrentTool, setZoom, toggleGrid]);
    
    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Header
                onClearCanvas={clearCanvas}
                isPropertiesPanelVisible={appState.isPropertiesPanelVisible}
                onTogglePropertiesPanel={togglePropertiesPanel}
            />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    currentTool={appState.currentTool}
                    onToolChange={setCurrentTool}
                />

                <Canvas
                    onClearCanvas={clearCanvas}
                    currentTool={appState.currentTool}
                    zoom={appState.zoom}
                    isGridVisible={appState.isGridVisible}
                    strokeColor={appState.strokeColor}
                    fillColor={appState.fillColor}
                    strokeWidth={appState.strokeWidth}

                />

                {appState.isPropertiesPanelVisible && (
                    <Properties
                        isVisible={appState.isPropertiesPanelVisible}
                        strokeColor={appState.strokeColor}
                        fillColor={appState.fillColor}
                        strokeWidth={appState.strokeWidth}
                        onStrokeColorChange={setStrokeColor}
                        onFillColorChange={setFillColor}
                        onStrokeWidthChange={setStrokeWidth}
                        zoom={appState.zoom}
                        onZoomChange={setZoom}
                        isGridVisible={appState.isGridVisible}
                        onToggleGrid={toggleGrid}
                    />
                )}
            </div>

            <StatusBar
                elementCount={appState.elements.length}
                selectedCount={appState.selectedElementIds.length}
                zoom={appState.zoom}
                isGridVisible={appState.isGridVisible}
                onToggleGrid={toggleGrid}
            />
        </div>
    );
}

export default DrawRoom;