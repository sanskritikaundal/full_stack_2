import { decodeToken } from "../utils/jwt";

export default function TokenStrip({ token, label }) {
  const decoded = decodeToken(token);
  const parts = token.split(".");

  return (
    <div className="token-strip">
      {label && <div className="token-strip__label">{label}</div>}
      <div className="token-strip__row">
        <span className="token-strip__seg token-strip__seg--header" title={parts[0]}>
          {parts[0].slice(0, 14)}…
        </span>
        <span className="token-strip__dot">.</span>
        <span className="token-strip__seg token-strip__seg--payload" title={parts[1]}>
          {parts[1].slice(0, 14)}…
        </span>
        <span className="token-strip__dot">.</span>
        <span className="token-strip__seg token-strip__seg--signature" title={parts[2]}>
          {parts[2]}
        </span>
      </div>
      {decoded && (
        <div className="token-strip__legend">
          <span><i className="token-strip__swatch token-strip__swatch--header" />header</span>
          <span><i className="token-strip__swatch token-strip__swatch--payload" />payload</span>
          <span><i className="token-strip__swatch token-strip__swatch--signature" />signature</span>
        </div>
      )}
    </div>
  );
}
