export interface StatCardProps {
  label: string;
  value: number | string;
  hint?: string;
}

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <section className="df-stat" aria-label={label}>
      <p className="df-stat__label">{label}</p>
      <p className="df-stat__value">{value}</p>
      {hint ? <p className="df-stat__hint">{hint}</p> : null}
    </section>
  );
}
