import { useState } from "react";
import { CalendarEvent } from "@/types/calendar";
import { filterEventsByDate } from "@/utils/calendarUtils";

interface FiltersProps {
  events: CalendarEvent[];
  setFilteredEvents: (events: CalendarEvent[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ events, setFilteredEvents }) => {
  const [filterDate, setFilterDate] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);

    if (!selectedDate) {
      setFilteredEvents(events);
    } else {
      const formattedDate = new Date(selectedDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      setFilteredEvents(filterEventsByDate(events, formattedDate));
    }
  };

  return (
    <input
      type="date"
      value={filterDate}
      onChange={handleFilterChange}
      className="mb-4 p-2 bg-gray-100 text-black border rounded-md"
    />
  );
};

export default Filters;
