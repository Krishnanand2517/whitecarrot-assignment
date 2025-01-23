import { CalendarEvent } from "@/types/calendar";

interface EventTableProps {
  events: CalendarEvent[];
}

const EventTable: React.FC<EventTableProps> = ({ events }) => {
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
              <td className="border px-4 py-2 min-w-16 md:min-w-28">
                {event.summary}
              </td>
              <td className="border px-4 py-2">
                {new Date(
                  event.start.dateTime || event.start.date || ""
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="border px-4 py-2 whitespace-nowrap">
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

export default EventTable;
