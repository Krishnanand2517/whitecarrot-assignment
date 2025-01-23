import { createClient } from "@/utils/supabase/server";
import OAuthButton from "@/components/OAuthButton";
import Calendar from "@/components/Calendar/Calendar";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      {session ? (
        <>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">
              Welcome {session.user.email}!
            </h1>
          </div>
          <Calendar />
        </>
      ) : (
        <OAuthButton />
      )}
    </div>
  );
}
