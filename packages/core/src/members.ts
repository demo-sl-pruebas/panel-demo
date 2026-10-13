import type { PlanId } from './plans';

export interface Member {
  id: string;
  fullName: string;
  email: string;
  plan: PlanId;
  club: string;
  /** ISO date (YYYY-MM-DD). */
  startDate: string;
  /** ISO date (YYYY-MM-DD); undefined while the contract is open-ended. */
  endDate?: string;
  frozen?: boolean;
}

export type MemberStatus = 'active' | 'frozen' | 'expired' | 'upcoming';

export function memberStatus(member: Member, today: string): MemberStatus {
  if (member.startDate > today) return 'upcoming';
  if (member.endDate !== undefined && member.endDate < today) return 'expired';
  if (member.frozen) return 'frozen';
  return 'active';
}

export function countByStatus(members: Member[], today: string): Record<MemberStatus, number> {
  const counts: Record<MemberStatus, number> = { active: 0, frozen: 0, expired: 0, upcoming: 0 };
  for (const m of members) counts[memberStatus(m, today)] += 1;
  return counts;
}
