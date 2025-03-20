import dateFormatter from "@/lib/intl/date-formatter";
import { useListTrips } from "../api/trips.api";
import { Trip } from "../trips.types";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

export default function TripsList() {
  const { data: trips } = useListTrips();

  if (!trips) return null;

  return (
    <section>
      <div className="text-gray-500 hidden text-lg font-bold mb-6 md:grid grid-cols-2 md:grid-cols-[100px_1fr_1fr_200px_100px] ">
        <h3>Date</h3>
        <h3>From</h3>
        <h3>To</h3>
        <h3>Distance</h3>
        <h3></h3>
      </div>
      {trips.map((t) => (
        <TripItem key={t.id} trip={t} />
      ))}
    </section>
  );
}

const TripItem = ({ trip }: { trip: Trip }) => {
  return (
    <div className="grid md:grid-cols-[100px_1fr_1fr_200px_100px] ">
      <TripItemField title="Date">
        {dateFormatter.formatDateToMMMDD(new Date(trip.start_time))}
      </TripItemField>
      <TripItemField title="From">{trip.pickup_location}</TripItemField>
      <TripItemField title="To">{trip.dropoff_location}</TripItemField>
      <TripItemField title="Distance">
        {trip.distance_miles.toFixed(2)} miles
      </TripItemField>
      <Link className="underline hover:opacity-45" to={`/trips/${trip.id}`}>
        view
      </Link>
    </div>
  );
};

const TripItemField = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex">
      <p className=" shrink-0 basis-[100px] md:hidden font-semibold text-gray-500">
        {title}:
      </p>
      <p className="md:truncate">{children}</p>
    </div>
  );
};
