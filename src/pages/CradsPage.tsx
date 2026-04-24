import { FiActivity, FiCheckCircle, FiShield, FiAlertTriangle } from "react-icons/fi";
import "./CardsPage.css";

type Log = {
  id: number;
  service: string;
  status: string;
  message: string;
};

type Props = {
  logs: Log[];
};

export default function CardsPage({ logs }: Props) {
    const total = logs.length;
    const allowed = logs.filter(log => log.status === "allowed").length;
    const blocked = logs.filter(log => log.status === "blocked").length;
    const anomalies = logs.filter(log => log.status === "anomaly").length;
  return (
    <section className="summary-grid">
      <div className="summary-card">
        <FiActivity className="summary-icon total" />
        <p>Total Events</p>
        <h2>{total.toLocaleString()}</h2>
      </div>

      <div className="summary-card">
        <FiCheckCircle className="summary-icon allowed" />
        <p>Allowed</p>
        <h2>{allowed.toLocaleString()}</h2>
      </div>

      <div className="summary-card">
        <FiShield className="summary-icon blocked" />
        <p>Blocked</p>
        <h2>{blocked.toLocaleString()}</h2>
      </div>

      <div className="summary-card anomaly-card">
        <FiAlertTriangle className="summary-icon anomaly" />
        <p>Anomalies</p>
        <h2>{anomalies.toLocaleString()}</h2>
      </div>
    </section>
  );
}