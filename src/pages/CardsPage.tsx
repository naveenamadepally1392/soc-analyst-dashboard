import { FiActivity, FiCheckCircle, FiShield, FiAlertTriangle } from "react-icons/fi";
import "./CardsPage.css";

type Totals = {
  total: number;
  allowed: number;
  blocked: number;
  anomaly: number;
};

export default function CardsPage({ totals }: { totals: Totals }) {
  const { total, allowed, blocked, anomaly } = totals;

  return (
    <section className="summary-grid">
      <div className="summary-card">
        <FiActivity className="summary-icon total" />
        <p>Total Events</p>
        <h2>{total}</h2>
      </div>

      <div className="summary-card">
        <FiCheckCircle className="summary-icon allowed" />
        <p>Allowed</p>
        <h2>{allowed}</h2>
      </div>

      <div className="summary-card">
        <FiShield className="summary-icon blocked" />
        <p>Blocked</p>
        <h2>{blocked}</h2>
      </div>

      <div className="summary-card">
        <FiAlertTriangle className="summary-icon anomaly" />
        <p>Anomalies</p>
        <h2>{anomaly}</h2>
      </div>
    </section>
  );
}
