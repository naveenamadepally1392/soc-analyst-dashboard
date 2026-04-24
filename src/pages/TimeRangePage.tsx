import "./TimeRangePage.css";

type TimeRange = "30m" | "1h" | "6h" | "12h" | "24h";

interface Props {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

const ranges: { label: string; value: TimeRange }[] = [
  { label: "30 min", value: "30m" },
  { label: "1 hr", value: "1h" },
  { label: "6 hr", value: "6h" },
  { label: "12 hr", value: "12h" },
  { label: "24 hr", value: "24h" },
];

export default function TimeRangePage({
  selectedRange,
  onRangeChange,
}: Props) {
  return (
    <div className="time-range-wrapper">
      <span className="time-range-label">Time range</span>

      <div className="time-range-buttons">
        {ranges.map((range) => (
          <button
            key={range.value}
            className={
              selectedRange === range.value
                ? "time-range-button active"
                : "time-range-button"
            }
            onClick={() => onRangeChange(range.value)}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}