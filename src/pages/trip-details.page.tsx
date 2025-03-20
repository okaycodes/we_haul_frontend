import Layout from "@/modules/common/components/layout";
import { useTripDetails, useTripLogs } from "@/modules/trips/api/trips.api";
import TripELDLogs from "@/modules/trips/components/ELDLogs.comp";
import TripMap from "@/modules/trips/components/TripMap.comp";
import { useParams } from "react-router-dom";

export default function TripDetailsPage() {
  const params = useParams();
  const { data: trip } = useTripDetails(params.id);
  const { data: logs } = useTripLogs(params.id);

  if (!trip || !logs) {
    return null;
  }

  return (
    <Layout>
      <section className="h-full flex flex-col items-center">
        <div className="w-full bg-primary-light py-16">
          {/* <h1 className="text-3xl mb-6 text-center">Trip Details</h1> */}
          <TripMap logs={logs} coordinates={trip?.route_data?.coordinates} />
        </div>
        <TripELDLogs tripId={trip.id} logs={logs} />
      </section>
    </Layout>
  );
}
