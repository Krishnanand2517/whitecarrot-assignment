"use client";

import { useEffect, useState } from "react";
import { fetchCalendarEvents } from "@/app/actions";
import { CalendarEvent } from "@/types/calendar";
import { logout } from "@/app/(auth)/logout/actions";

import EventTable from "./EventTable";
import Filters from "./Filters";

const Calendar = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [filteredUpcomingEvents, setFilteredUpcomingEvents] = useState<
    CalendarEvent[]
  >([]);
  const [pastEvents, setPastEvents] = useState<CalendarEvent[]>([]);
  const [filteredPastEvents, setFilteredPastEvents] = useState<CalendarEvent[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getEvents = async () => {
    try {
      const { upcomingEvents, pastEvents } = await fetchCalendarEvents();
      setUpcomingEvents(upcomingEvents);
      setFilteredUpcomingEvents(upcomingEvents);
      setPastEvents(pastEvents);
      setFilteredPastEvents(pastEvents);
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
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            Refresh
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
          <Filters
            events={upcomingEvents}
            setFilteredEvents={setFilteredUpcomingEvents}
          />
        </div>
        <EventTable events={filteredUpcomingEvents} />
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold mb-4">Past Week Events</h3>
          <Filters
            events={pastEvents}
            setFilteredEvents={setFilteredPastEvents}
          />
        </div>
        <EventTable events={filteredPastEvents} />
      </div>
    </div>
  );
};

export default Calendar;
