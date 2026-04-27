# SOC Event Investigator

A frontend dashboard for reviewing security events. The app shows event totals, time-based filtering, status filtering, a trend chart, and a log details panel for investigation.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app locally

```bash
npm run dev
```

### 3. Open in browser

Vite will print a local URL, usually:

```text
http://localhost:5173
```

## Deployed to Vercel

```text
https://soc-analyst-dashboard.vercel.app/
```

## Features

- Mock login flow
- Light/dark mode
- Summary cards for total, allowed, blocked, and anomaly events
- Time range filter: 30 min, 1 hr, 6 hr, 12 hr, 24 hr
- Status filter for event type
- Event trend chart
- Logs table with row selection
- Detail panel for investigating a selected log

## Tech Stack

- React 19
- TypeScript
- Vite
- Recharts for the event timeline
- React Icons for dashboard actions and summary cards
- Component-level CSS files

## Project Structure

```
src/
├── components/
│   ├── Cards/          # Summary cards component
│   ├── EventsChart/    # Scatter plot visualization
│   ├── LogsTable/      # Logs table with filtering and drawer
│   └── TimeRange/      # Time range filter buttons
├── data/
│   └── logs.ts         # Mock log data
├── pages/
│   ├── DashboardPage.tsx   # Main dashboard
│   └── Login.tsx           # Login page
├── App.tsx
└── main.tsx
```

## Demo Login

This project uses a mock login flow. Enter any non-empty username and password to continue to the dashboard.

## Project Structure

```text
src/
  App.tsx                    # Login/dashboard shell state
  data/logs.ts               # Mock SOC event data generation
  components/
    Cards/                   # Event summary cards
    EventsChart/             # Recharts event timeline
    LogsTable/               # Logs table and investigation drawer
    TimeRange/               # Time range controls
  pages/
    DashboardPage.tsx        # Main dashboard state and filtering
    Login.tsx                # Mock login screen
```

## Implementation Notes

- `DashboardPage` owns the shared dashboard state so cards, chart, and table all read from the same filtered log set.
- Time range filtering supports all events, 30 minutes, 1 hour, 6 hours, 12 hours, and 24 hours.
- Status filtering supports all statuses plus allowed, blocked, and anomaly event types.
- The event chart maps statuses onto a timeline so analysts can quickly compare allowed, blocked, and anomalous activity over time.
- Selecting a table row opens an investigation drawer with event metadata such as service, message, timestamp, source IP, destination IP, and user ID.
- Theme preference is stored in `localStorage`, so the selected light/dark mode persists across refreshes.

## UI / UX Decisions

A key architectural decision in this project was to centralize all data and filter state within the Dashboard component, making it the single source of truth for the application. The Dashboard is responsible for holding the raw logs, managing filter states (time range and status), and deriving the filtered dataset.

Instead of distributing data logic across multiple components, all transformations (filtering, sorting, aggregations for cards, and chart data) are performed once at the Dashboard level. The resulting data is then passed down to child components (Cards, Chart, and LogsTable) as props.

This approach ensures strong data consistency across the UI. Any user interaction—such as changing the time range or status filter—triggers a single recalculation, and all dependent components update in sync. This eliminates the risk of mismatched views (e.g., cards showing different counts than the table), reduces redundant computations, and simplifies debugging.

From a scalability perspective, this pattern enforces a clear separation of concerns:
- **Dashboard** → data ownership and business logic  
- **Child components** → pure presentation  

This mirrors real-world frontend architectures where centralized state management (via Context, Redux, or similar patterns) is preferred for complex, data-driven interfaces.

The table uses a master-detail pattern: selecting a row opens a side detail panel instead of navigating away. This allows users to inspect event details while preserving context, which is critical for investigation workflows.

The mock dataset is generated on the client and distributed across a 24-hour window. This keeps the demo self-contained while still enabling realistic time-based filtering and visualization behavior.

The visual design uses muted colors, compact spacing, and status badges to align with real-world security and monitoring dashboards, prioritizing clarity and quick scanning over decorative UI.


## Assumptions and Scope

- Authentication is intentionally mocked and does not call a backend.
- Event data is generated locally in `src/data/logs.ts`; no external API is required.
- Filters are client-side because the dataset is small and intended for frontend evaluation.

