"use client"


import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

function MyApp() {
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
        };

        fetchUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <div>
            {user ? (
                <div>Bienvenido, {user.email}</div>
            ) : (
                <p>No autenticado</p>
            )}
        </div>
    );
}

export default MyApp;
