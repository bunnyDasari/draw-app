"use client";
import React, { useRef, useEffect, useState } from "react";
import { Tool } from "../types";

interface CanvasProps {
    currentTool: Tool;
    zoom: number;
    isGridVisible: boolean;
    strokeColor: string;
    fillColor: string;
    strokeWidth: number;
    onClearCanvas: () => void
}

interface Shape {
    type: Tool;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    strokeColor: string;
    fillColor: string;
    strokeWidth: number;
    text?: string;
}

export const Canvas: React.FC<CanvasProps> = ({
    currentTool,
    zoom,
    isGridVisible,
    strokeColor,
    fillColor,
    strokeWidth,
    onClearCanvas
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [shapes, setShapes] = useState<Shape[]>([]);
    const [drawingShape, setDrawingShape] = useState<Shape | null>(null);
    const [editingText, setEditingText] = useState<{ x: number; y: number; id: number } | null>(null);
    const [textInputValue, setTextInputValue] = useState("");

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        if (isGridVisible) {
            const gridSize = 20 * zoom;
            ctx.strokeStyle = "#e5e7eb";
            ctx.lineWidth = 1;
            for (let x = 0; x <= canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y <= canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        }

        const clear = onClearCanvas()
        console.log(clear)

        shapes.forEach((s) => {
            ctx.strokeStyle = s.strokeColor;
            ctx.fillStyle = s.fillColor;
            ctx.lineWidth = s.strokeWidth;

            switch (s.type) {
                case "rectangle":
                    ctx.fillRect(s.startX, s.startY, s.endX - s.startX, s.endY - s.startY);
                    ctx.strokeRect(s.startX, s.startY, s.endX - s.startX, s.endY - s.startY);
                    break;
                case "circle":
                    const radius = Math.sqrt((s.endX - s.startX) ** 2 + (s.endY - s.startY) ** 2);
                    ctx.beginPath();
                    ctx.arc(s.startX, s.startY, radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    break;
                case "line":
                case "arrow":
                    ctx.beginPath();
                    ctx.moveTo(s.startX, s.startY);
                    ctx.lineTo(s.endX, s.endY);
                    ctx.stroke();
                    break;
                case "pen":
                    ctx.beginPath();
                    ctx.moveTo(s.startX, s.startY);
                    ctx.lineTo(s.endX, s.endY);
                    ctx.stroke();
                    break;
                case "eraser":
                    ctx.clearRect(s.startX - strokeWidth / 2, s.startY - strokeWidth / 2, s.endX - s.startX + strokeWidth, s.endY - s.startY + strokeWidth);
                    break;
                case "text":
                    if (s.text) {
                        ctx.fillStyle = s.strokeColor;
                        ctx.font = `${s.strokeWidth * 4}px sans-serif`;
                        ctx.fillText(s.text, s.startX, s.startY);
                    }
                    break;
            }
        });


        // Draw the shape being drawn (optional preview)
        if (drawingShape && drawingShape.type !== "text") {
            ctx.strokeStyle = drawingShape.strokeColor;
            ctx.fillStyle = drawingShape.fillColor;
            ctx.lineWidth = drawingShape.strokeWidth;

            switch (drawingShape.type) {
                case "rectangle":
                    ctx.fillRect(drawingShape.startX, drawingShape.startY, drawingShape.endX - drawingShape.startX, drawingShape.endY - drawingShape.startY);
                    ctx.strokeRect(drawingShape.startX, drawingShape.startY, drawingShape.endX - drawingShape.startX, drawingShape.endY - drawingShape.startY);
                    break;
                case "circle":
                    const radius = Math.sqrt((drawingShape.endX - drawingShape.startX) ** 2 + (drawingShape.endY - drawingShape.startY) ** 2);
                    ctx.beginPath();
                    ctx.arc(drawingShape.startX, drawingShape.startY, radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    break;
                case "line":
                case "arrow":
                // const arrow = Math.sqrt((drawingShape.endX - drawingShape.startX) ** 2 + (drawingShape.endY - drawingShape.startY) ** 2);
                // ctx.beginPath();
                // ctx.arc(drawingShape.startX, drawingShape.startY, arrow, 0, Math.PI * 2);
                // ctx.fill();
                // ctx.stroke();
                // break;
                case "pen":
                    ctx.beginPath();
                    ctx.moveTo(drawingShape.startX, drawingShape.startY);
                    ctx.lineTo(drawingShape.endX, drawingShape.endY);
                    ctx.stroke();
                    break;
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (canvas && container) {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            draw();
        }
    }, [shapes, drawingShape, isGridVisible, zoom, editingText, textInputValue]);

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoom;
        const y = (e.clientY - rect.top) / zoom;

        if (currentTool === "text") {
            // Open a temporary input for text
            const id = shapes.length;
            setEditingText({ x, y, id });
            setTextInputValue("");
            return;
        }

        if (!currentTool || currentTool === "select") return;

        setDrawingShape({
            type: currentTool,
            startX: x,
            startY: y,
            endX: x,
            endY: y,
            strokeColor,
            fillColor,
            strokeWidth,
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!drawingShape) return;
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = (e.clientX - rect.left) / zoom;
        const y = (e.clientY - rect.top) / zoom;
        setDrawingShape({ ...drawingShape, endX: x, endY: y });
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!drawingShape) return;
        console.log(drawingShape)
        setShapes([...shapes, drawingShape]);
        setDrawingShape(null);
    };

    const handleTextSubmit = () => {
        if (editingText) {
            const newTextShape: Shape = {
                type: "text",
                startX: editingText.x,
                startY: editingText.y,
                endX: editingText.x,
                endY: editingText.y,
                strokeColor,
                fillColor,
                strokeWidth,
                text: textInputValue,
            };
            setShapes([...shapes, newTextShape]);
            setEditingText(null);
            setTextInputValue("");
        }
    };

    return (
        <div ref={containerRef} className="flex-1 bg-gray-50 relative overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 cursor-crosshair"
                style={{ transform: `scale(${zoom})`, transformOrigin: "0 0" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />

            {editingText && (
                <input
                    autoFocus
                    value={textInputValue}
                    onChange={(e) => setTextInputValue(e.target.value)}
                    onBlur={handleTextSubmit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleTextSubmit();
                    }}
                    style={{
                        position: "absolute",
                        left: editingText.x * zoom,
                        top: editingText.y * zoom - 10,
                        fontSize: strokeWidth * 4,
                        padding: 2,
                        border: "1px solid gray",
                        outline: "none",
                        background: "white",
                    }}
                />
            )}
        </div>
    );
};
