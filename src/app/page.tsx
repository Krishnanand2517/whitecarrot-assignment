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
          <div className="w-full max-w-4xl mb-6 mt-2">
            <h4 className="text-sm md:text-base text-right">
              Current user:{" "}
              <span className="font-bold">{session.user.email}</span>
            </h4>
          </div>
          <Calendar />
        </>
      ) : (
        <OAuthButton />
      )}
    </div>
  );
}
