"use client"

import { createClient } from "@/lib/supabase/client";

const Auth = () => {
    const supabase = createClient();
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: process.env.NODE_ENV === 'production'
                    ? 'https://contrack-ten.vercel.app/folders'
                    : 'http://localhost:3000/folders',
            },
        });
        if (error) console.error('Error al iniciar sesión:', error.message);
    };

    return (
        <div>
            <button onClick={signInWithGoogle}>
                Iniciar sesión con Google
            </button>
        </div>
    );
};

export default Auth;
