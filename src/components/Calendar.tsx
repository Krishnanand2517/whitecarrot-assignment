"use client";

import { useEffect, useState } from "react";
import { fetchCalendarEvents } from "@/app/actions";
import { logout } from "@/app/(auth)/logout/actions";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const calendarEvents = await fetchCalendarEvents();
        setEvents(calendarEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();

    await logout();
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
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-700">
              <th className="border px-4 py-2 text-left">Event</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-left">Time</th>
              <th className="border px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="hover:bg-slate-600 transition-colors"
              >
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
                  No upcoming events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
