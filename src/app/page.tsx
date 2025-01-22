import { createClient } from "@/utils/supabase/server";
import OAuthButton from "@/components/OAuthButton";
import UserProfile from "@/components/UserProfile";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      {session ? <UserProfile user={session.user} /> : <OAuthButton />}
    </div>
  );
}
