import { Song } from "@/types";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
            },
        }
    );

    const {
        data: sessionData,
        error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
        console.log(sessionError.message);
        return [];
    }

    const { data, error } = await supabase
        .from('liked_songs')
        .select('*, songs(*)')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.log(error.message);
        return [];
    }

    return (data?.map((item) => item.songs) as any) || [];
};

export default getLikedSongs;
