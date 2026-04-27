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
  formattedTimestamp?: string;
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

export const generateMockLogs = (count: number = 50): Log[] => {
  const buckets = [
    30 * 60 * 1000,        // last 30 min
    60 * 60 * 1000,        // 30m–1h
    6 * 60 * 60 * 1000,    // 1h–6h
    12 * 60 * 60 * 1000,   // 6h–12h
    24 * 60 * 60 * 1000,   // 12h–24h
  ];

  const now = Date.now();
  const logs: Log[] = [];

  let id = 1;

  const logsPerBucket = Math.ceil(count / buckets.length);

  buckets.forEach((maxRange, index) => {
    const minRange = index === 0 ? 0 : buckets[index - 1];

    for (let i = 0; i < logsPerBucket && logs.length < count; i++) {
      const randomTime =
        now - (minRange + Math.random() * (maxRange - minRange));

      logs.push({
        id: id++,
        service: services[Math.floor(Math.random() * services.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(randomTime).toISOString(),
        sourceIp: getRandomIp(),
        destinationIp: getRandomIp(),
        userId:
          Math.random() > 0.2
            ? `user_${String(id).padStart(3, "0")}`
            : "system",
      });
    }
  });

  return logs;
};

export const mockLogs: Log[] = generateMockLogs(50);
