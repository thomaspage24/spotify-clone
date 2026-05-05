import { create } from "zustand";
import { Song } from "@/types";

interface PlayerStore {
    ids: string[];
    activeId?: string;
    songs: Song[];
    setActiveSong: (song: Song, songs: Song[]) => void;
    setId: (id: string) => void;
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: undefined,
    songs: [],
    setActiveSong: (song: Song, songs: Song[]) =>
        set({ activeId: song.id, ids: songs.map((s) => s.id), songs }),
    setId: (id: string) => set({ activeId: id }),
    reset: () => set({ ids: [], activeId: undefined, songs: [] }),
}));

export default usePlayer;
