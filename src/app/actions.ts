"use server";

import { createClient } from "@/utils/supabase/server";
import { CalendarEvent } from "@/types/calendar";

export async function fetchCalendarEvents(): Promise<{
  upcomingEvents: CalendarEvent[];
  pastEvents: CalendarEvent[];
}> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.provider_token) {
    throw new Error("No provider token found");
  }

  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [upcomingResponse, pastResponse] = await Promise.all([
    fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events?" +
        new URLSearchParams({
          timeMin: now.toISOString(),
          maxResults: "10",
          singleEvents: "true",
          orderBy: "startTime",
        }),
      {
        headers: {
          Authorization: `Bearer ${session.provider_token}`,
        },
      }
    ),
    fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events?" +
        new URLSearchParams({
          timeMin: oneWeekAgo.toISOString(),
          maxResults: "50",
          singleEvents: "true",
          orderBy: "startTime",
        }),
      {
        headers: {
          Authorization: `Bearer ${session.provider_token}`,
        },
      }
    ),
  ]);

  if (!upcomingResponse.ok || !pastResponse.ok) {
    throw new Error("Failed to fetch calendar events");
  }

  const upcomingData = await upcomingResponse.json();
  const pastData = await pastResponse.json();

  return {
    upcomingEvents: upcomingData.items as CalendarEvent[],
    pastEvents: pastData.items
      .filter(
        (event: CalendarEvent) =>
          new Date(event.start.dateTime || event.start.date || "") < now
      )
      .slice(0, 10) as CalendarEvent[],
  };
}
