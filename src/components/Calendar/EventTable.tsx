import { useState } from "react";
import { CalendarEvent } from "@/types/calendar";

interface EventTableProps {
  events: CalendarEvent[];
}

const EventTable: React.FC<EventTableProps> = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-2 text-left">Event</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left w-[120px]">Time</th>
            <th className="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {currentEvents.map((event) => (
            <tr
              key={event.id}
              className="hover:bg-gray-600 transition-colors duration-200"
            >
              <td className="px-4 py-2">{event.summary}</td>
              <td className="px-4 py-2">
                {new Date(
                  event.start.dateTime || event.start.date || ""
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {event.start.dateTime
                  ? new Date(event.start.dateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "All Day"}
              </td>
              <td className="px-4 py-2">{event.description || "-"}</td>
            </tr>
          ))}
          {currentEvents.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                No events found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center py-4 border-t">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 bg-gray-600 text-white rounded-md ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-700 transition-colors duration-200"
          }`}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 bg-gray-600 text-white rounded-md ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-700 transition-colors duration-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventTable;
