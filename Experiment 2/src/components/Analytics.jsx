// src/components/Analytics.jsx
//
// Assignment 4 / Experiment 2.2: pulls entirely from memoized selectors
// (selectPostAnalytics). Nothing here is stored state — it's all derived,
// so it can never drift out of sync with posts.

import { useSelector } from "react-redux";
import { selectPostAnalytics } from "../features/posts/postsSlice";

export default function Analytics() {
  const analytics = useSelector(selectPostAnalytics);

  const stats = [
    { label: "Total Posts", value: analytics.total },
    { label: "Published", value: analytics.published.count },
    { label: "Drafts", value: analytics.draft.count },
    { label: "Scheduled", value: analytics.scheduled.count },
  ];

  return (
    <section className="panel">
      <h2>Post Analytics</h2>
      <div className="stat-grid">
        {stats.map((s) => (
          <div className="stat-box" key={s.label}>
            <span className="stat-box__label">{s.label}</span>
            <span className="stat-box__value">{s.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
