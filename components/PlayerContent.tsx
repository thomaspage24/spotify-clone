"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import { Song } from "@/types";
import useLoadSong from "@/hooks/useLoadSong";
import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import LikeButton from "./LikeButton";
import Slider from "./Slider";

interface PlayerContentProps {
    song: Song;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song }) => {
    const songUrl = useLoadSong(song);
    const imageUrl = useLoadImage(song);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);

    const onPlayNext = () => {
        const { ids, activeId, setId } = usePlayer.getState();
        if (ids.length === 0) return;
        const currentIndex = ids.findIndex((id) => id === activeId);
        const nextId = ids[currentIndex + 1] ?? ids[0];
        setId(nextId);
    };

    const onPlayPrevious = () => {
        const { ids, activeId, setId } = usePlayer.getState();
        if (ids.length === 0) return;
        const currentIndex = ids.findIndex((id) => id === activeId);
        const prevId = ids[currentIndex - 1] ?? ids[ids.length - 1];
        setId(prevId);
    };

    useEffect(() => {
        if (!songUrl) return;

        const audio = new Audio(songUrl);
        audioRef.current = audio;
        audio.volume = volume;

        audio.addEventListener('ended', onPlayNext);
        audio.play().then(() => setIsPlaying(true)).catch(console.error);

        return () => {
            audio.pause();
            audio.removeEventListener('ended', onPlayNext);
            audioRef.current = null;
        };
        // Intentionally run once on mount; component is keyed by activeId
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handlePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const toggleMute = () => {
        setVolume((prev) => (prev === 0 ? 1 : 0));
    };

    const PlayIcon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            {/* Left: song info */}
            <div className="flex items-center gap-x-4">
                <div className="relative h-12 w-12 hidden md:block shrink-0">
                    <Image
                        fill
                        src={imageUrl || '/images/liked.png'}
                        alt="Now playing"
                        className="object-cover rounded-md"
                    />
                </div>
                <div className="overflow-hidden">
                    <p className="text-white text-sm truncate">{song.title}</p>
                    <p className="text-neutral-400 text-xs truncate">{song.author}</p>
                </div>
                <LikeButton song={song} />
            </div>

            {/* Center controls — mobile: play only, right-aligned */}
            <div className="flex md:hidden col-auto w-full justify-end items-center">
                <div
                    onClick={handlePlay}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white cursor-pointer"
                >
                    <PlayIcon size={22} className="text-black" />
                </div>
            </div>

            {/* Center controls — desktop */}
            <div className="hidden md:flex items-center justify-center gap-x-6 w-full">
                <AiFillStepBackward
                    onClick={onPlayPrevious}
                    size={26}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
                <div
                    onClick={handlePlay}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white cursor-pointer hover:scale-105 transition"
                >
                    <PlayIcon size={22} className="text-black" />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={26}
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>

            {/* Right: volume */}
            <div className="hidden md:flex items-center justify-end gap-x-2 pr-2">
                <VolumeIcon
                    onClick={toggleMute}
                    size={26}
                    className="cursor-pointer text-neutral-400 hover:text-white transition shrink-0"
                />
                <div className="w-24">
                    <Slider value={volume} onChange={setVolume} />
                </div>
            </div>
        </div>
    );
};

export default PlayerContent;
