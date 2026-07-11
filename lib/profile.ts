export type AppMode = "single" | "couple";

export type Profile = {
  mode: AppMode;
  // Universal
  myName: string;       // own name (single: user name, couple: "your" name)
  birthDate: string;    // yyyy-mm-dd (own birthday)
  // Couple-only
  herName?: string;     // partner's nickname
  partnerBirthDate?: string; // yyyy-mm-dd (partner's birthday)
  anniversaryDate?: string; // yyyy-mm-dd
  myAvatar?: string;    // Base64 data URL
  partnerAvatar?: string; // Base64 data URL
  trackPeriod?: boolean; // toggle to track period cycle
};

const STORAGE_KEY = "app:profile:v2";

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Profile;
    if (!parsed.mode || !parsed.myName || !parsed.birthDate) return null;
    // For couple mode, make sure new fields are loaded if present
    return parsed;
  } catch {
    return null;
  }
}

export function saveProfile(profile: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function daysTogether(anniversaryDate: string): number {
  const start = new Date(anniversaryDate);
  const today = new Date();
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((today.getTime() - start.getTime()) / 86400000));
}

export function nextBirthdayCountdown(birthDate: string): { days: number; turning: number } {
  const birth = new Date(birthDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  next.setHours(0, 0, 0, 0);
  if (next.getTime() < today.getTime()) {
    next = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const days = Math.round((next.getTime() - today.getTime()) / 86400000);
  const turning = next.getFullYear() - birth.getFullYear();
  return { days, turning };
}

const ZODIAC: { name: string; emoji: string; from: [number, number]; to: [number, number] }[] = [
  { name: "Capricorn", emoji: "♑", from: [12, 22], to: [1, 19] },
  { name: "Aquarius", emoji: "♒", from: [1, 20], to: [2, 18] },
  { name: "Pisces", emoji: "♓", from: [2, 19], to: [3, 20] },
  { name: "Aries", emoji: "♈", from: [3, 21], to: [4, 19] },
  { name: "Taurus", emoji: "♉", from: [4, 20], to: [5, 20] },
  { name: "Gemini", emoji: "♊", from: [5, 21], to: [6, 20] },
  { name: "Cancer", emoji: "♋", from: [6, 21], to: [7, 22] },
  { name: "Leo", emoji: "♌", from: [7, 23], to: [8, 22] },
  { name: "Virgo", emoji: "♍", from: [8, 23], to: [9, 22] },
  { name: "Libra", emoji: "♎", from: [9, 23], to: [10, 22] },
  { name: "Scorpio", emoji: "♏", from: [10, 23], to: [11, 21] },
  { name: "Sagittarius", emoji: "♐", from: [11, 22], to: [12, 21] },
];

export function getZodiac(birthDate: string): { name: string; emoji: string } {
  const d = new Date(birthDate);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const found = ZODIAC.find(({ from, to }) => {
    if (from[0] === to[0]) return month === from[0] && day >= from[1] && day <= to[1];
    if (month === from[0]) return day >= from[1];
    if (month === to[0]) return day <= to[1];
    return false;
  });
  return found ?? { name: "Rahasia", emoji: "✨" };
}
