"use client";

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type ProfileContextType = {
    profile: any;
    loading: boolean;
    refresh: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = useCallback(async () => {
        try {
            const response = await fetch('/api/profile');
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (profile === null) {
            fetchProfile();
        }
    }, [fetchProfile, profile]);

    return (
        <ProfileContext.Provider value={{ 
            profile, 
            loading,
            refresh: fetchProfile
        }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
      throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
  };
  