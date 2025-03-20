import dateFormatter from "@/lib/intl/date-formatter";
import { EldLog, LogStatus } from "../trips.types";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ELDGraphProps {
  logs: EldLog[];
  previousDayLastLog?: EldLog;
}

export default function ELDGraph({ logs, previousDayLastLog }: ELDGraphProps) {
  const labels = generateTimeLabels();

  const dataPoints = logs.map((log) => {
    const time = dateFormatter.formatDateHHMM(
      new Date(log.timestamp).toISOString()
    );
    return logStatusToDataPoint(time, log.status);
  });

  const data = {
    labels,
    datasets: [
      {
        data: [
          logStatusToDataPoint(
            "00:00",
            previousDayLastLog?.status ?? ("OFF DUTY" as LogStatus)
          ),
          ...dataPoints,
          { x: "", y: dataPoints.at(-1)?.y },
        ],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        stepped: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: dateFormatter.formatDateToMMMDD(new Date(logs[0].timestamp)),
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return `Time: ${tooltipItems[0].label}`;
          },
          label: (tooltipItem) => {
            const log = logs.find((t) => {
              const time = dateFormatter.formatDateHHMM(
                new Date(t.timestamp).toISOString()
              );

              return time === tooltipItem.label;
            });
            return log ? log.action : "";
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {},
      },
      y: {
        ticks: {
          stepSize: 1,
          callback: function (value) {
            const labels = ["On Duty", "Driving", "Sleeper Berth", "Off Duty"];
            return labels[value as number] ?? "";
          },
        },
        min: 0,
        max: 3.5,
      },
    },
  };

  return (
    <div className="overflow-scroll w-[350px] sm:w-[500px] md:w-[800px] overflow-x-scroll">
      <Line data={data} options={options} />
    </div>
  );
}

const logStatusToDataPoint = (time: string, status: LogStatus) => {
  switch (status) {
    case "OFF DUTY":
      return { x: time, y: 3 };
    case "SLEEPER BERTH":
      return { x: time, y: 2 };
    case "DRIVING":
      return { x: time, y: 1 };
    case "ON DUTY":
      return { x: time, y: 0 };
    default:
      return null;
  }
};

const generateTimeLabels = () => {
  const labels: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      labels.push(
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
      );
    }
  }
  return labels;
};
