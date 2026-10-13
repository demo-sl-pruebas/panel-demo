import { getPlan, type PlanId } from './plans';

export type BillingCycle = 'monthly' | 'annual';

export interface PricingInput {
  plan: PlanId;
  cycle: BillingCycle;
  /** Member holds a valid student card. */
  student?: boolean;
  /** Number of additional family members on the same contract (0-4). */
  familyMembers?: number;
}

export interface PriceBreakdown {
  /** Price for the whole billing period, before discounts, in cents. */
  listCents: number;
  discounts: { rule: string; percent: number }[];
  /** Effective discount percentage after the cap is applied. */
  totalDiscountPercent: number;
  /** Price for the whole billing period, after discounts, in cents. */
  totalCents: number;
}

/** Discounts never stack beyond this percentage. */
export const MAX_DISCOUNT_PERCENT = 35;

export const RULES = {
  annual: 15,
  student: 20,
  familyPerMember: 5,
  familyMaxMembers: 4,
} as const;

export function priceMembership(input: PricingInput): PriceBreakdown {
  const plan = getPlan(input.plan);
  const months = input.cycle === 'annual' ? 12 : 1;
  const listCents = plan.monthlyPriceCents * months;

  const discounts: PriceBreakdown['discounts'] = [];
  if (input.cycle === 'annual') {
    discounts.push({ rule: 'annual', percent: RULES.annual });
  }
  if (input.student) {
    discounts.push({ rule: 'student', percent: RULES.student });
  }
  const family = input.familyMembers ?? 0;
  if (family < 0 || family > RULES.familyMaxMembers || !Number.isInteger(family)) {
    throw new RangeError(
      `familyMembers must be an integer between 0 and ${RULES.familyMaxMembers}`,
    );
  }
  if (family > 0) {
    discounts.push({ rule: 'family', percent: family * RULES.familyPerMember });
  }

  const raw = discounts.reduce((sum, d) => sum + d.percent, 0);
  const totalDiscountPercent = Math.min(raw, MAX_DISCOUNT_PERCENT);
  const totalCents = Math.floor((listCents * (100 - totalDiscountPercent)) / 100);

  return { listCents, discounts, totalDiscountPercent, totalCents };
}

export function formatEuros(cents: number, locale = 'en-IE'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(cents / 100);
}
