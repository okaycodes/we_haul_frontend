import { Link } from "react-router-dom";
import { useGroupedTripLogs } from "../api/trips.api";
import ELDGraph from "./ELDGraph.comp";
import dateFormatter from "@/lib/intl/date-formatter";
import { EldLog } from "../trips.types";

interface TripELDLogsProps {
  tripId: string;
  logs: EldLog[];
}
export default function TripELDLogs({ tripId, logs }: TripELDLogsProps) {
  const { data: groupedLogs } = useGroupedTripLogs(logs);

  if (!groupedLogs) return null;
  return (
    <div className="my-10 space-y-20">
      {Object.values(groupedLogs).map((e, i, a) => {
        const day = dateFormatter.formatDateToMMMDD(new Date(e[0].timestamp));
        return (
          <div key={e[0].id}>
            <Link
              to={`/trips/${tripId}/log-sheet/${day}`}
              className="underline"
            >
              View Full Sheet
            </Link>
            <ELDGraph logs={e} previousDayLastLog={a.at(i - 1)?.at(-1)} />
          </div>
        );
      })}
    </div>
  );
}
