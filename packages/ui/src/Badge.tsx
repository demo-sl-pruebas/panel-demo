export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  tone?: BadgeTone;
  children: string;
}

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`df-badge df-badge--${tone}`}>{children}</span>;
}
