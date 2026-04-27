export const formatTimestamp = (timestamp?: string | number) => {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatChartTick = (timestamp: string | number) =>
  new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
