export const mockLogs: { id: number; service: string; status: "allowed" | "blocked" | "anomaly"; message: string }[] = [
  { id: 1, service: "Auth Service", status: "allowed", message: "Login successful" },
  { id: 2, service: "Payment API", status: "blocked", message: "Payment failed" },
  { id: 3, service: "User Service", status: "anomaly", message: "Slow response" },
  { id: 4, service: "Database", status: "blocked", message: "Connection timeout" },
  { id: 5, service: "Scheduler", status: "allowed", message: "Job completed" },
  { id: 6, service: "Notification Service", status: "allowed", message: "Email sent" },
  { id: 7, service: "Auth Service", status: "anomaly", message: "Multiple login attempts" },
  { id: 8, service: "Order Service", status: "allowed", message: "Order created" },
];
