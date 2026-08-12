import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="page page--center">
      <section className="panel panel--danger">
        <div className="panel__eyebrow">403</div>
        <h1 className="panel__title">Access denied</h1>
        <p className="panel__hint">
          Your role doesn't have the clearance this page requires. If you think that's wrong,
          it isn't — this demo enforces roles literally.
        </p>
        <Link className="btn btn--primary" to="/dashboard">
          Back to dashboard
        </Link>
      </section>
    </div>
  );
}
