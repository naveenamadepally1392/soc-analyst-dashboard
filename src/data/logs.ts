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
export const mockLogs: Log[] = [
  { id: 1, service: "Auth Service", status: "allowed", message: "Login successful", timestamp: "2024-01-15 10:23:45", sourceIp: "192.168.1.100", destinationIp: "10.0.0.5", userId: "user_001" },
  { id: 2, service: "Payment API", status: "blocked", message: "Payment failed", timestamp: "2024-01-15 10:24:12", sourceIp: "192.168.1.105", destinationIp: "10.0.0.8", userId: "user_002" },
  { id: 3, service: "User Service", status: "anomaly", message: "Slow response", timestamp: "2024-01-15 10:25:30", sourceIp: "192.168.1.110", destinationIp: "10.0.0.12", userId: "user_003" },
  { id: 4, service: "Database", status: "blocked", message: "Connection timeout", timestamp: "2024-01-15 10:26:00", sourceIp: "192.168.1.115", destinationIp: "10.0.0.15", userId: "user_004" },
  { id: 5, service: "Scheduler", status: "allowed", message: "Job completed", timestamp: "2024-01-15 10:27:15", sourceIp: "192.168.1.120", destinationIp: "10.0.0.20", userId: "system" },
  { id: 6, service: "Notification Service", status: "allowed", message: "Email sent", timestamp: "2024-01-15 10:28:00", sourceIp: "192.168.1.125", destinationIp: "10.0.0.25", userId: "user_005" },
  { id: 7, service: "Auth Service", status: "anomaly", message: "Multiple login attempts", timestamp: "2024-01-15 10:29:30", sourceIp: "192.168.1.130", destinationIp: "10.0.0.5", userId: "user_006" },
  { id: 8, service: "Order Service", status: "allowed", message: "Order created", timestamp: "2024-01-15 10:30:45", sourceIp: "192.168.1.135", destinationIp: "10.0.0.30", userId: "user_007" },
  { id: 9, service: "Inventory Service", status: "allowed", message: "Stock updated", timestamp: "2024-01-15 10:31:10", sourceIp: "192.168.1.140", destinationIp: "10.0.0.35", userId: "user_008" },
  { id: 10, service: "Auth Service", status: "blocked", message: "Invalid credentials", timestamp: "2024-01-15 10:32:05", sourceIp: "192.168.1.145", destinationIp: "10.0.0.5", userId: "user_009" },
  { id: 11, service: "Payment API", status: "anomaly", message: "Duplicate transaction detected", timestamp: "2024-01-15 10:33:22", sourceIp: "192.168.1.150", destinationIp: "10.0.0.8", userId: "user_010" },
  { id: 12, service: "User Service", status: "allowed", message: "Profile updated", timestamp: "2024-01-15 10:34:18", sourceIp: "192.168.1.155", destinationIp: "10.0.0.12", userId: "user_011" },
  { id: 13, service: "Database", status: "anomaly", message: "High query latency", timestamp: "2024-01-15 10:35:40", sourceIp: "192.168.1.160", destinationIp: "10.0.0.15", userId: "system" },
  { id: 14, service: "Scheduler", status: "blocked", message: "Job execution failed", timestamp: "2024-01-15 10:36:55", sourceIp: "192.168.1.165", destinationIp: "10.0.0.20", userId: "system" },
  { id: 15, service: "Notification Service", status: "allowed", message: "Push notification sent", timestamp: "2024-01-15 10:37:30", sourceIp: "192.168.1.170", destinationIp: "10.0.0.25", userId: "user_012" },
  { id: 16, service: "Order Service", status: "blocked", message: "Order validation failed", timestamp: "2024-01-15 10:38:45", sourceIp: "192.168.1.175", destinationIp: "10.0.0.30", userId: "user_013" },
  { id: 17, service: "Inventory Service", status: "anomaly", message: "Unexpected stock drop", timestamp: "2024-01-15 10:39:50", sourceIp: "192.168.1.180", destinationIp: "10.0.0.35", userId: "system" },
  { id: 18, service: "Auth Service", status: "allowed", message: "Password reset successful", timestamp: "2024-01-15 10:40:25", sourceIp: "192.168.1.185", destinationIp: "10.0.0.5", userId: "user_014" },
];
