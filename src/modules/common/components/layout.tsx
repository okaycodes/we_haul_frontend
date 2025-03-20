import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-grow flex flex-col h-full w-full mx-auto">
        {children}
      </section>
      <Footer />
    </section>
  );
}
