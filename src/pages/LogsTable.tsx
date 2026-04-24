import "./LogsTable.css";

type LogStatus = "allowed" | "blocked" | "anomaly";

type Log = {
  id: number;
  service: string;
  status: LogStatus;
  message: string;
};

type Props = {
  logs: Log[];
};

export default function LogsTable({ logs }: Props) {
  return (
    <div className="logs-table-wrapper">
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
            <tr key={log.id}>
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
  );
}
