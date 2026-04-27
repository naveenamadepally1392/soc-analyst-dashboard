import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./EventsChart.css";
import { formatChartTick, formatTimestamp } from "../../utils/formatTimestamp";

type LogStatus = "allowed" | "blocked" | "anomaly";

type Log = {
  timestamp: string;
  status: LogStatus;
  service?: string;
  message?: string;
  formattedTimestamp?: string;
};

type ChartPoint = {
  time: number;
  status: number;
  label: LogStatus;
  service?: string;
  message?: string;
  displayTime: string;
};

type TooltipPayload = {
  payload: ChartPoint;
};

type TooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
};

type ScatterPointProps = {
  cx?: number;
  cy?: number;
  payload?: ChartPoint;
};

const getColor = (status: LogStatus) => {
  if (status === "allowed") return "#22c55e";
  if (status === "blocked") return "#ef4444";
  return "#f59e0b";
};

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="custom-tooltip">
      <div><strong>{data.service}</strong></div>
      <div>{data.message}</div>
      <div>{data.displayTime}</div>
      <div style={{ textTransform: "capitalize" }}>
        Status: {data.label}
      </div>
    </div>
  );
};

export default function EventsChart({ logs }: { logs: Log[] }) {
  const mapped: ChartPoint[] = logs.map((log) => {
    const date = new Date(log.timestamp);

    return {
      time: date.getTime(),
      status:
        log.status === "allowed"
          ? 3
          : log.status === "anomaly"
          ? 2
          : 1,
      label: log.status,
      service: log.service,
      message: log.message,
      displayTime: log.formattedTimestamp || formatTimestamp(log.timestamp),
    };
  });

  return (
    <div className="chart-container">
      <div className="chart-title">Events Timeline</div>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid />

          <XAxis
            dataKey="time"
            type="number"
            domain={["auto", "auto"]}
            tickFormatter={formatChartTick}
          />

          <YAxis
            dataKey="status"
            ticks={[1, 2, 3]}
            tickFormatter={(v) =>
              v === 3 ? "Allowed" : v === 2 ? "Anomaly" : "Blocked"
            }
          />


          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
            isAnimationActive={false}
          />

          <Scatter
            data={mapped}
            isAnimationActive={false}
            activeShape={false}
            shape={(props: ScatterPointProps) => {
              const { cx, cy, payload } = props;
              if (cx === undefined || cy === undefined || !payload) {
                return null;
              }

              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}
                  fill={getColor(payload.label)}
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
