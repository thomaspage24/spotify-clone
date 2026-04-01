"use client";

import { useSupabase } from "@/providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import Modal from "./Modal";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";


const AuthModal = () => {
    const { supabase: supabaseClient } = useSupabase();
    const router = useRouter();
    const { onClose, isOpen} = useAuthModal();

    useEffect( () => {
        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((event, session) => {
            if (session) {
                router.refresh();
                onClose();
            }
        });
        return () => subscription.unsubscribe();
    }, [router, onClose, supabaseClient]);
    
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }
    return (
        <Modal
            title="Welcome back"
            description="Loigin to your account"
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth
                theme="dark"
                magicLink
                providers= {["github"]}
                supabaseClient={supabaseClient}
                appearance={ {
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#22c55e'
                            }
                        }
                    }
                }}
            />
        </Modal>
        
    );
}

export default AuthModal;