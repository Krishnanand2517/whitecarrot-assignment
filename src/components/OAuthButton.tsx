"use client";

import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

import GoogleLogo from "../../public/Google_Logo.svg";

const OAuthButton = () => {
  const handleOAuth = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        scopes: "https://www.googleapis.com/auth/calendar.readonly",
      },
    });
  };

  return (
    <div>
      <button
        onClick={handleOAuth}
        className="px-6 py-2 hover:scale-105 rounded-md flex gap-4 transition-all animate-gradient-slow bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%] text-white"
      >
        <Image
          src={GoogleLogo}
          alt="Login with Google"
          height={25}
          width={25}
        />
        Continue with Google
      </button>
    </div>
  );
};

export default OAuthButton;
