"use client";

import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePlayer();
    const activeSong = player.songs.find((s) => s.id === player.activeId);

    if (!activeSong || !player.activeId) {
        return null;
    }

    return (
        <div className="fixed bottom-0 bg-black w-full h-20 px-4">
            <PlayerContent key={player.activeId} song={activeSong} />
        </div>
    );
};

export default Player;
