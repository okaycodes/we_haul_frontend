import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib/http/httpClient";
import { EldLog, GroupedLog, Trip, TripFormData } from "../trips.types";
import { useEffect, useState } from "react";
import dateFormatter from "@/lib/intl/date-formatter";
import { useNavigate } from "react-router-dom";

export function useCreateTrip() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const methods = useForm<TripFormData>();

  const mutation = useMutation({
    mutationFn: async (data: TripFormData) => {
      return await httpClient.post<{ token: string }>("/trips/", {
        ...data,
        start_time: new Date().toISOString(),
      });
    },
  });

  const createTrip = async (data: TripFormData) => {
    const res = await mutation.mutateAsync(data);
    if (res.error) {
      console.error(res.error);
    }

    queryClient.invalidateQueries({ queryKey: ["Trips"] });
    navigate("/trips");
  };

  return {
    methods,
    errors: methods.formState.errors,
    isSubmitting: mutation.isPending,
    createTrip,
  };
}

export function useListTrips() {
  const listTrips = async () => (await httpClient.get<Trip[]>("/trips/")).data;

  return useQuery({
    queryKey: ["Trips"],
    queryFn: listTrips,
  });
}

export function useTripDetails(id?: string) {
  const getTrip = async () =>
    (await httpClient.get<Trip>(`/trips/${id}/`)).data;

  return useQuery({
    queryKey: ["Trip-Details"],
    queryFn: getTrip,
    enabled: !!id,
  });
}

export function useTripLogs(id?: string) {
  const getTripLogs = async () =>
    (await httpClient.get<EldLog[]>(`/eld-logs/?trip_id=${id}`)).data;

  return useQuery({
    queryKey: ["TripLogs"],
    queryFn: getTripLogs,
  });
}

export function useGroupedTripLogs(logs?: EldLog[]) {
  const [groupedData, setGroupedData] = useState<GroupedLog>();

  useEffect(() => {
    if (logs) {
      const groupdedData: GroupedLog = logs.reduce((r: GroupedLog, e) => {
        const day = dateFormatter.formatDateToMMMDD(new Date(e.timestamp));
        if (r.hasOwnProperty(day)) return { ...r, [day]: [...r[day], e] };
        return { ...r, [day]: [e] };
      }, {});
      setGroupedData(groupdedData);
    }
  }, [logs]);
  // group log data by day

  return { data: groupedData };
}

export function useDayTripLogs(day: string, logs?: EldLog[]) {
  const [error, setError] = useState<Error>();
  const [dayLogs, setDayLogs] = useState<{
    dayLogs: EldLog[];
    previousDayLastLog?: EldLog;
  }>();

  const res = useGroupedTripLogs(logs);

  useEffect(() => {
    if (res.data) {
      const dataEntries = Object.entries(res.data);
      const index = dataEntries.findIndex((i) => i[0] === day);
      const foundDay = dataEntries[index]?.[1];
      const previousDay = dataEntries?.[index - 1]?.[1];

      if (!foundDay) return setError(new Error("Day Not Found"));

      setDayLogs({
        dayLogs: foundDay,
        previousDayLastLog: previousDay?.at(-1),
      });
    }
  }, [res.data]);

  return { error, data: dayLogs };
}
