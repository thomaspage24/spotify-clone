import { Song } from "@/types";
import { useSupabase } from "@/providers/SupabaseProvider";

const useLoadImage = (song: Song) => {
    const { supabase: supabaseClient } = useSupabase();

    if (!song) {
        return null;
    }

    const { data: imageData } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(song.image_path);

    return imageData.publicUrl;
};

export default useLoadImage;