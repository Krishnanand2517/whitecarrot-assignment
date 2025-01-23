"use client";

import { useEffect, useState } from "react";
import { fetchCalendarEvents } from "@/app/actions";
import { CalendarEvent } from "@/types/calendar";
import { logout } from "@/app/(auth)/logout/actions";

const Calendar = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getEvents = async () => {
    try {
      const { upcomingEvents, pastEvents } = await fetchCalendarEvents();
      setUpcomingEvents(upcomingEvents);
      setPastEvents(pastEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    await logout();
  };

  const handleRefresh = async () => {
    setLoading(true);
    await getEvents();
  };

  const renderEventTable = (events: CalendarEvent[]) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="border px-4 py-2 text-left">Event</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Time</th>
              <th className="border px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-600">
                <td className="border px-4 py-2">{event.summary}</td>
                <td className="border px-4 py-2">
                  {new Date(
                    event.start.dateTime || event.start.date || ""
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="border px-4 py-2">
                  {event.start.dateTime
                    ? new Date(event.start.dateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "All Day"}
                </td>
                <td className="border px-4 py-2">{event.description || "-"}</td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="border px-4 py-8 text-center text-gray-500"
                >
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Calendar Events</h2>
        <div className="flex gap-4">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
        {renderEventTable(upcomingEvents)}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Past Week Events</h3>
        {renderEventTable(pastEvents)}
      </div>
    </div>
  );
};

export default Calendar;
