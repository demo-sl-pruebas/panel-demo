import { describe, expect, it } from 'vitest';
import { priceMembership } from './pricing';

describe('off-peak discount', () => {
  it('takes ten percent off Basic and Plus', () => {
    expect(priceMembership({ plan: 'basic', cycle: 'monthly', offPeak: true }).totalCents).toBe(
      2691,
    );
  });

  it('is not available for Premium', () => {
    expect(() => priceMembership({ plan: 'premium', cycle: 'monthly', offPeak: true })).toThrow(
      /Premium/,
    );
  });
});
