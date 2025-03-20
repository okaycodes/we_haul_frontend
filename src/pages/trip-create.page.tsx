import Layout from "@/modules/common/components/layout";
import { useCreateTrip } from "@/modules/trips/api/trips.api";
import TripForm from "@/modules/trips/components/TripForm.comp";

export default function CreateTripPage() {
  const { methods, createTrip, isSubmitting } = useCreateTrip();

  return (
    <Layout>
      <section className="h-full grow flex flex-col items-center justify-center bg-primary-light">
        <div className="w-11/12 flex flex-col items-center">
          <h1 className="text-3xl mb-6">Create A Trip</h1>
          <TripForm
            methods={methods}
            handleSubmit={createTrip}
            isSubmitting={isSubmitting}
          />
        </div>
      </section>
    </Layout>
  );
}
