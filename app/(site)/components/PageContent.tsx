"use client";

import SongItem from "@/components/SongItem";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";


interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {
    const player = usePlayer();

    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No songs available.
            </div>
        )
    }
    return (
        <div
            className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-8
            gap-4
            mt-4
            "
        >
            {songs.map((item) => (
                <SongItem
                    key={item.id}
                    onClick={(id) => {
                        const song = songs.find((s) => s.id === id);
                        if (song) player.setActiveSong(song, songs);
                    }}
                    data={item}
                    />
            ))}

        </div>
    );
}

export default PageContent;