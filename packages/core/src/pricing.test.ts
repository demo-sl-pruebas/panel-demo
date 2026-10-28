import { describe, expect, it } from 'vitest';
import { formatEuros, MAX_DISCOUNT_PERCENT, priceMembership } from './pricing';

describe('priceMembership', () => {
  it('charges the list price for a plain monthly plan', () => {
    const result = priceMembership({ plan: 'basic', cycle: 'monthly' });
    expect(result.listCents).toBe(2990);
    expect(result.totalDiscountPercent).toBe(0);
    expect(result.totalCents).toBe(2990);
  });

  it('applies the annual discount over twelve months', () => {
    const result = priceMembership({ plan: 'plus', cycle: 'annual' });
    expect(result.listCents).toBe(3990 * 12);
    expect(result.totalDiscountPercent).toBe(15);
    expect(result.totalCents).toBe(40698);
  });

  it('adds five percent per family member', () => {
    const result = priceMembership({ plan: 'plus', cycle: 'monthly', familyMembers: 3 });
    expect(result.discounts).toEqual([{ rule: 'family', percent: 15 }]);
  });

  it('rounds half cents to the nearest cent', () => {
    const result = priceMembership({ plan: 'basic', cycle: 'monthly', familyMembers: 1 });
    expect(result.totalCents).toBe(2841);
  });

  it('caps stacked discounts', () => {
    const result = priceMembership({
      plan: 'plus',
      cycle: 'annual',
      student: true,
      familyMembers: 2,
    });
    expect(result.totalDiscountPercent).toBe(MAX_DISCOUNT_PERCENT);
  });

  it('rejects an out-of-range family size', () => {
    expect(() => priceMembership({ plan: 'basic', cycle: 'monthly', familyMembers: 5 })).toThrow(
      RangeError,
    );
  });
});

describe('formatEuros', () => {
  it('formats cents as euros', () => {
    expect(formatEuros(2990)).toBe('€29.90');
  });
});
