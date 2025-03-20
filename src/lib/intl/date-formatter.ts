function formatDateHHMM(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  });
}

function formatDateToMMMDD(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short", // "MMM" format (e.g., "Mar")
    day: "2-digit", // "dd" format (e.g., "17")
  });
}

function formatDateToMMDDYYYY(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

const dateFormatter = {
  formatDateHHMM,
  formatDateToMMMDD,
  formatDateToMMDDYYYY,
};

export default dateFormatter;
