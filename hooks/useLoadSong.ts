import { Song } from "@/types";
import { useSupabase } from "@/providers/SupabaseProvider";

const useLoadSong = (song: Song) => {
    const { supabase } = useSupabase();

    if (!song) return null;

    const { data } = supabase
        .storage
        .from('songs')
        .getPublicUrl(song.song_path);

    return data.publicUrl;
};

export default useLoadSong;
