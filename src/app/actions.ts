"use server";

import { createClient } from "@/utils/supabase/server";
import { CalendarEvent } from "@/types/calendar";

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.provider_token) {
    throw new Error("No provider token found");
  }

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?" +
      new URLSearchParams({
        timeMin: new Date().toISOString(),
        maxResults: "10",
        singleEvents: "true",
        orderBy: "startTime",
      }),
    {
      headers: {
        Authorization: `Bearer ${session.provider_token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch calendar events");
  }

  const data = await response.json();
  return data.items as CalendarEvent[];
}
