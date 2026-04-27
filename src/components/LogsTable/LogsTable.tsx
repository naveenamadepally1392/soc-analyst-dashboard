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
  formattedTimestamp?: string;
};

type StatusFilter = "all" | "allowed" | "blocked" | "anomaly";

type Props = {
  logs: Log[];
  statusFilter: StatusFilter;
  setStatusFilter: (val: StatusFilter) => void;
};

export default function LogsTable({ logs, statusFilter, setStatusFilter }: Props) {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  const filteredLogs =
    statusFilter === "all"
      ? logs
      : logs.filter((log) => log.status === statusFilter);

  return (
    <div className={`logs-container ${selectedLog ? "with-drawer" : ""}`}>
      <div className="table-section">
        <div className="table-toolbar">
          <span className="table-title">Filter logs by status</span>
          <select
            className="status-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as StatusFilter);
              setSelectedLog(null);
            }}
          >
            <option value="all">All Statuses</option>
            <option value="allowed">Allowed</option>
            <option value="blocked">Blocked</option>
            <option value="anomaly">Anomaly</option>
          </select>
        </div>

        <table className="logs-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Service</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className={selectedLog?.id === log.id ? "selected-row" : ""}
              >
                <td>{log.formattedTimestamp || log.timestamp}</td>
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