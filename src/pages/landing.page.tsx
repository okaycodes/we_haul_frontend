import Button from "@/modules/common/components/button";
import Layout from "@/modules/common/components/layout";

export default function LandingPage() {
  return (
    <Layout>
      <section className="h-full grow flex flex-col items-center justify-center bg-primary-light">
        <h1 className="text-3xl mb-6">Welcome To WeHaul</h1>
        <p className="text-center text-4xl md:text-6xl max-w-[700px] mb-12">
          The professional ELD management platform you can call your own
        </p>

        <Button href="/trips/create" variant="LARGE">
          Get Started
        </Button>
      </section>
    </Layout>
  );
}
