"use client";

import { useCallback, useRef } from "react";

interface SliderProps {
    value: number;
    onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
    const trackRef = useRef<HTMLDivElement>(null);

    const getValueFromEvent = useCallback((clientX: number) => {
        const track = trackRef.current;
        if (!track) return;
        const { left, width } = track.getBoundingClientRect();
        const clamped = Math.min(Math.max((clientX - left) / width, 0), 1);
        onChange(clamped);
    }, [onChange]);

    const onMouseDown = (e: React.MouseEvent) => {
        getValueFromEvent(e.clientX);

        const onMouseMove = (e: MouseEvent) => getValueFromEvent(e.clientX);
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div
            ref={trackRef}
            onMouseDown={onMouseDown}
            className="relative flex items-center w-full h-4 cursor-pointer group"
        >
            {/* Track background */}
            <div className="w-full h-1 rounded-full bg-neutral-600">
                {/* Filled portion */}
                <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${value * 100}%` }}
                />
            </div>
            {/* Thumb */}
            <div
                className="absolute h-3 w-3 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${value * 100}% - 6px)` }}
            />
        </div>
    );
};

export default Slider;
