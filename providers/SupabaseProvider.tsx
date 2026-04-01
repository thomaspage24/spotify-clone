"use client";

import { Database } from "@/types_db";

import { createContext, useContext, useState } from "react";

import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

type SupabaseContextType = {
    supabase: SupabaseClient<Database>;
};

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const useSupabase = () => {
    const context = useContext(SupabaseContext);
    if (!context) throw new Error("useSupabase must be used within SupabaseProvider");
    return context;
};

interface SupabaseProviderProps {
    children: React.ReactNode;
};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
    const [supabaseClient] = useState(() =>
        createBrowserClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
    );

    return (
        <SupabaseContext.Provider value={{ supabase: supabaseClient }}>
            {children}
        </SupabaseContext.Provider>
    );
};

export default SupabaseProvider;