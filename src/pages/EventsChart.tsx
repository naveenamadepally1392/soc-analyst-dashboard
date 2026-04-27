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

type LogStatus = "allowed" | "blocked" | "anomaly";

type Log = {
  timestamp: string;
  status: LogStatus;
  service?: string;
  message?: string;
};

const getColor = (status: LogStatus) => {
  if (status === "allowed") return "#22c55e";
  if (status === "blocked") return "#ef4444";
  return "#f59e0b";
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="custom-tooltip">
      <div><strong>{data.service}</strong></div>
      <div>{data.message}</div>
      <div>{new Date(data.time).toLocaleString()}</div>
      <div style={{ textTransform: "capitalize" }}>
        Status: {data.label}
      </div>
    </div>
  );
};

export default function EventsChart({ logs }: { logs: Log[] }) {
  const mapped = logs.map((log) => {
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
            tickFormatter={(time) =>
              new Date(time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
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
            activeShape={false}   // 👈 prevents hover replacement
            shape={(props: any) => {
              const { cx, cy, payload } = props;

              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={5}  // fixed size (no jump)
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
