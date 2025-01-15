"use client"

import { createClient } from "@/lib/supabase/client";

const Auth = () => {
    const supabase = createClient();
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
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
