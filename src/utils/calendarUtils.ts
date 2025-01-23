import { CalendarEvent } from "@/types/calendar";

export const filterEventsByDate = (
  events: CalendarEvent[],
  filterDate: string
): CalendarEvent[] => {
  return events.filter((event) => {
    const eventDate = new Date(
      event.start.dateTime || event.start.date || ""
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return eventDate === filterDate;
  });
};
