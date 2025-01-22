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
      },
    });
  };

  return (
    <div>
      <button
        onClick={handleOAuth}
        className="px-6 py-2 border border-slate-300 hover:bg-slate-800 rounded-md flex gap-4 transition-colors"
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
