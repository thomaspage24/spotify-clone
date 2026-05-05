"use client";

import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import usePlayer from "@/hooks/usePlayer";

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
    const player = usePlayer();

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No liked songs.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {songs.map((song) => (
                <div key={song.id} className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <MediaItem
                            data={song}
                            onClick={(id) => {
                                const s = songs.find((s) => s.id === id);
                                if (s) player.setActiveSong(s, songs);
                            }}
                        />
                    </div>
                    <LikeButton song={song} />
                </div>
            ))}
        </div>
    );
};

export default LikedContent;
