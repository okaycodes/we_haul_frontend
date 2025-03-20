import Layout from "@/modules/common/components/layout";
import TripsList from "@/modules/trips/components/TripsList.comp";

export default function TripsPage() {
  return (
    <Layout>
      <section className="h-full flex flex-col grow  items-center bg-primary-light">
        <section className="w-11/12 py-10">
          <h1 className="text-3xl mb-6 w-full">Your Trips</h1>
          <TripsList />
        </section>
      </section>
    </Layout>
  );
}
