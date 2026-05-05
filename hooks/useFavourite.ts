"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useSupabase } from "@/providers/SupabaseProvider";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

const useFavourite = (songId: string) => {
    const router = useRouter();
    const { supabase } = useSupabase();
    const { user } = useUser();
    const authModal = useAuthModal();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) return;

        const fetchData = async () => {
            const { data, error } = await supabase
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', Number(songId))
                .single();

            if (!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();
    }, [songId, supabase, user?.id]);

    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (isLiked) {
            const { error } = await supabase
                .from('liked_songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id', Number(songId));

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
            }
        } else {
            const { error } = await supabase
                .from('liked_songs')
                .insert({ user_id: user.id, song_id: Number(songId) });

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success('Liked!');
            }
        }

        router.refresh();
    };

    return { isLiked, handleLike };
};

export default useFavourite;
