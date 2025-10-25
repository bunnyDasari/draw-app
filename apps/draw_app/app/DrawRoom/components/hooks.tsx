import { useState, useCallback } from 'react';
import { Tool, Element, AppState, StrokeWidth } from '../types';

export const useDrawing = () => {
    const [appState, setAppState] = useState<AppState>({
        currentTool: 'select',
        strokeColor: '#0b0b0bff',
        fillColor: 'transparent',
        strokeWidth: 2,
        elements: [],
        selectedElementIds: [],
        zoom: 1,
        panX: 0,
        panY: 0,
        isGridVisible: true,
        isPropertiesPanelVisible: true,
    });
    const [clear, setClear] = useState(false)

    const setCurrentTool = useCallback((tool: Tool) => {
        setAppState(prev => ({ ...prev, currentTool: tool }));
    }, []);

    const setStrokeColor = useCallback((color: string) => {
        setAppState(prev => ({ ...prev, strokeColor: color }));
    }, []);

    const setFillColor = useCallback((color: string) => {
        setAppState(prev => ({ ...prev, fillColor: color }));
    }, []);

    const setStrokeWidth = useCallback((width: StrokeWidth) => {
        setAppState(prev => ({ ...prev, strokeWidth: width }));
    }, []);

    const setZoom = useCallback((zoom: number) => {
        setAppState(prev => ({ ...prev, zoom: Math.max(0.1, Math.min(5, zoom)) }));
    }, []);

    const toggleGrid = useCallback(() => {
        setAppState(prev => ({ ...prev, isGridVisible: !prev.isGridVisible }));
    }, []);

    const togglePropertiesPanel = useCallback(() => {
        setAppState(prev => ({ ...prev, isPropertiesPanelVisible: !prev.isPropertiesPanelVisible }));
    }, []);

    const addElement = useCallback((element: Element) => {
        setAppState(prev => ({
            ...prev,
            elements: [...prev.elements, element],
        }));
    }, []);

    const clearCanvas = () => {
        setClear(!clear)
    };
    console.log(clear)
    return {
        appState,
        setCurrentTool,
        setStrokeColor,
        setFillColor,
        setStrokeWidth,
        setZoom,
        toggleGrid,
        addElement,
        clearCanvas,
        togglePropertiesPanel,
    };
};