"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavourite from "@/hooks/useFavourite";
import { Song } from "@/types";

interface LikeButtonProps {
    song: Song;
}

const LikeButton: React.FC<LikeButtonProps> = ({ song }) => {
    const { isLiked, handleLike } = useFavourite(song.id);
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleLike();
            }}
            className="hover:opacity-75 transition"
        >
            <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
        </button>
    );
};

export default LikeButton;
