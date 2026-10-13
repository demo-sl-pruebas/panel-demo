export type PlanId = 'basic' | 'plus' | 'premium';

export interface MembershipPlan {
  id: PlanId;
  name: string;
  /** Monthly list price in euro cents. */
  monthlyPriceCents: number;
  includesClasses: boolean;
  includesAllClubs: boolean;
}

export const PLANS: Record<PlanId, MembershipPlan> = {
  basic: {
    id: 'basic',
    name: 'Basic',
    monthlyPriceCents: 2990,
    includesClasses: false,
    includesAllClubs: false,
  },
  plus: {
    id: 'plus',
    name: 'Plus',
    monthlyPriceCents: 3990,
    includesClasses: true,
    includesAllClubs: false,
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    monthlyPriceCents: 5490,
    includesClasses: true,
    includesAllClubs: true,
  },
};

export function getPlan(id: PlanId): MembershipPlan {
  return PLANS[id];
}
