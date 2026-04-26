export type LogStatus = "allowed" | "blocked" | "anomaly";

export type Log = {
  id: number;
  service: string;
  status: LogStatus;
  message: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  userId: string;
};

const services = [
  "Auth Service",
  "Payment API",
  "User Service",
  "Database",
  "Scheduler",
  "Notification Service",
  "Order Service",
  "Inventory Service",
];

const messages = [
  "Login successful",
  "Invalid credentials",
  "Payment failed",
  "Duplicate transaction detected",
  "Slow response",
  "Connection timeout",
  "Job completed",
  "Email sent",
  "Multiple login attempts",
  "Order created",
  "Stock updated",
  "High query latency",
  "Job execution failed",
  "Unexpected stock drop",
  "Password reset successful",
];

const statuses: LogStatus[] = ["allowed", "blocked", "anomaly"];

// random IP generator
const getRandomIp = () =>
  `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

const getRandomTimestamp = () => {
  const now = Date.now();
  const past = now - 24 * 60 * 60 * 1000; // 24h ago
  const randomTime = past + Math.random() * (now - past);
  return new Date(randomTime).toISOString();
};

export const generateMockLogs = (count: number = 50): Log[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    service: services[Math.floor(Math.random() * services.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    timestamp: getRandomTimestamp(),
    sourceIp: getRandomIp(),
    destinationIp: getRandomIp(),
    userId: Math.random() > 0.2 ? `user_${String(i + 1).padStart(3, "0")}` : "system",
  }));
};

export const mockLogs: Log[] = generateMockLogs(50);

