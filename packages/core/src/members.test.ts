import { describe, expect, it } from 'vitest';
import { countByStatus, memberStatus, type Member } from './members';

const base: Member = {
  id: 'm-001',
  fullName: 'Alex Example',
  email: 'alex@demo-fitness.example',
  plan: 'basic',
  club: 'Riverside',
  startDate: '2026-01-10',
};

describe('memberStatus', () => {
  it('is active for an open-ended contract', () => {
    expect(memberStatus(base, '2026-11-01')).toBe('active');
  });
  it('is upcoming before the start date', () => {
    expect(memberStatus({ ...base, startDate: '2026-12-01' }, '2026-11-01')).toBe('upcoming');
  });
  it('is expired after the end date', () => {
    expect(memberStatus({ ...base, endDate: '2026-10-31' }, '2026-11-01')).toBe('expired');
  });
  it('is frozen when the contract is paused', () => {
    expect(memberStatus({ ...base, frozen: true }, '2026-11-01')).toBe('frozen');
  });
});

describe('countByStatus', () => {
  it('counts every status', () => {
    const counts = countByStatus(
      [
        base,
        { ...base, id: 'm-002', frozen: true },
        { ...base, id: 'm-003', endDate: '2026-01-31' },
      ],
      '2026-11-01',
    );
    expect(counts).toEqual({ active: 1, frozen: 1, expired: 1, upcoming: 0 });
  });
});
