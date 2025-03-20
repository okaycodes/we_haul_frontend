import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/landing.page";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/react-query/queryClient";
import TripsPage from "./pages/trips.page";
import TripDetailsPage from "./pages/trip-details.page";
import TripCreatePage from "./pages/trip-create.page";
import ELDLogDetailsPage from "./pages/eld-log-details.page";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/trips/create" element={<TripCreatePage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:id" element={<TripDetailsPage />} />
          <Route
            path="/trips/:id/log-sheet/:day"
            element={<ELDLogDetailsPage />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
