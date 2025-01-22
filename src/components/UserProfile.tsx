"use client";

import { User } from "@supabase/supabase-js";
import { logout } from "@/app/(auth)/logout/actions";

export default function UserProfile({ user }: { user: User }) {
  const signOut = async (e: React.FormEvent) => {
    e.preventDefault();

    await logout();
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
      <p className="mb-4">Signed in as: {user.email}</p>
      <button
        onClick={signOut}
        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
