import { FieldPath, UseFormReturn } from "react-hook-form";
import { TripFormData } from "../trips.types";
import Button from "@/modules/common/components/button";
import LocationSearch from "@/modules/common/components/locationSearch";
import Input from "@/modules/common/components/input";

interface TripFormProps {
  methods: UseFormReturn<TripFormData>;
  isSubmitting: boolean;
  handleSubmit: (data: TripFormData) => void;
}

export default function TripForm({
  methods,
  isSubmitting,
  handleSubmit,
}: TripFormProps) {
  const onSelect = (fieldName: FieldPath<TripFormData>, value: string) => {
    methods.setValue(fieldName, value);
  };

  return (
    <form
      onSubmit={methods.handleSubmit(handleSubmit)}
      className="w-full max-w-[650px] flex flex-col gap-3 "
    >
      <LocationSearch
        placeholder="Current Location"
        onSelect={(data) => onSelect("start_location", data.address)}
      />

      <LocationSearch
        placeholder="Pickup Location"
        onSelect={(data) => onSelect("pickup_location", data.address)}
      />
      <LocationSearch
        placeholder="Drop Off Location"
        onSelect={(data) => onSelect("dropoff_location", data.address)}
      />
      <Input
        placeholder="Current Cycle Used"
        {...methods.register("current_cycle_hours_used")}
        label=""
      />
      <Button isLoading={isSubmitting}>Create Trip</Button>
    </form>
  );
}
