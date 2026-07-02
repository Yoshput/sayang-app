"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Profile, loadProfile, saveProfile, clearProfile } from "@/lib/profile";

type ProfileContextValue = {
  profile: Profile | null;
  ready: boolean;
  setProfile: (p: Profile) => void;
  resetProfile: () => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfileState(loadProfile());
    setReady(true);
  }, []);

  const setProfile = (p: Profile) => {
    saveProfile(p);
    setProfileState(p);
  };

  const resetProfile = () => {
    clearProfile();
    setProfileState(null);
  };

  return (
    <ProfileContext.Provider value={{ profile, ready, setProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}
