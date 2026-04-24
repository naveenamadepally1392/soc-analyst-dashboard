import { useState } from "react";
import "./LogsTable.css";

type LogStatus = "allowed" | "blocked" | "anomaly";

type Log = {
  id: number;
  service: string;
  status: LogStatus;
  message: string;
  timestamp?: string;
  sourceIp?: string;
  destinationIp?: string;
  userId?: string;
};

type Props = {
  logs: Log[];
};

export default function LogsTable({ logs }: Props) {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  return (
    <div className="logs-container">
      {/* TABLE */}
      <div className="table-section">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className={selectedLog?.id === log.id ? "selected-row" : ""}
              >
                <td>{log.service}</td>
                <td>{log.message}</td>
                <td>
                  <span className={`status-badge ${log.status}`}>
                    {log.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DRAWER */}
      {selectedLog && (
        <div className="drawer-panel">
          <div className="drawer-header">
            <h2>Log Details</h2>
            <button onClick={() => setSelectedLog(null)}>✕</button>
          </div>

          <div className="drawer-content">
            <Detail label="ID" value={selectedLog.id} />
            <Detail label="Service" value={selectedLog.service} />
            <Detail label="Message" value={selectedLog.message} />
            <Detail label="Status" value={selectedLog.status.toUpperCase()} status={selectedLog.status} />
            <Detail label="Timestamp" value={selectedLog.timestamp || "N/A"} />
            <Detail label="Source IP" value={selectedLog.sourceIp || "N/A"} />
            <Detail label="Destination IP" value={selectedLog.destinationIp || "N/A"} />
            <Detail label="User ID" value={selectedLog.userId || "N/A"} />
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
  status,
}: {
  label: string;
  value: string | number;
  status?: LogStatus;
}) {
  return (
    <div className="drawer-field">
      <label>{label}</label>
      {status ? (
        <span className={`status-badge ${status}`}>{value}</span>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}
