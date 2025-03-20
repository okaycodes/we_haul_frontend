import dateFormatter from "@/lib/intl/date-formatter";
import Layout from "@/modules/common/components/layout";
import {
  useDayTripLogs,
  useTripDetails,
  useTripLogs,
} from "@/modules/trips/api/trips.api";
import ELDGraph from "@/modules/trips/components/ELDGraph.comp";
import { useParams } from "react-router-dom";

export default function ELDLogDetailsPage() {
  const params = useParams();

  const { data: trip, error: tripError } = useTripDetails(params.id);
  const { data: logs } = useTripLogs(params.id);

  const { data: groupedLogs, error: logError } = useDayTripLogs(
    params.day as string,
    logs
  );

  if (logError || tripError) {
    return (
      <Layout>
        <h1 className="text-3xl text-center my-6">Log Sheet Not Found</h1>
      </Layout>
    );
  }

  if (!groupedLogs || !trip) return null;
  const { dayLogs, previousDayLastLog } = groupedLogs;

  return (
    <Layout>
      <section className="h-full flex flex-col items-center pt-12 max-w-250 mx-auto text-lg">
        <h1 className="text-3xl text-center">Drivers Daily Log</h1>
        <p className="mb-12">
          ({dateFormatter.formatDateToMMDDYYYY(new Date(dayLogs[0].timestamp))})
        </p>

        <div className="w-full flex justify-between mb-4">
          <p>
            From: <span className="underline">{trip?.start_location}</span>
          </p>
          <p>
            To: <span className="underline"> {trip?.dropoff_location}</span>
          </p>
        </div>

        <div className="flex w-full">
          <p className="basis-[130px] shrink-0">Driver Name:</p>
          <p>Jane Doe</p>
        </div>

        <div className="flex w-full">
          <p className="basis-[130px] shrink-0">Office Address:</p>
          <p>Lorem Ipsum sit amet dolor</p>
        </div>

        <div className="flex w-full">
          <p className="basis-[130px] shrink-0">License Plate:</p>
          <p>AX870Y</p>
        </div>

        <ELDGraph logs={dayLogs} previousDayLastLog={previousDayLastLog} />
      </section>
    </Layout>
  );
}
