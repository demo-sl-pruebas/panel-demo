import type { Member } from '@demo-fitness/core';

/** Sample data until the members API is wired in. All people are fictitious. */
export const SAMPLE_MEMBERS: Member[] = [
  {
    id: 'm-1001',
    fullName: 'Jordan Blake',
    email: 'jordan.blake@members.demo-fitness.example',
    plan: 'premium',
    club: 'Riverside',
    startDate: '2025-03-01',
  },
  {
    id: 'm-1002',
    fullName: 'Sam Rivera',
    email: 'sam.rivera@members.demo-fitness.example',
    plan: 'plus',
    club: 'Old Town',
    startDate: '2025-09-15',
    frozen: true,
  },
  {
    id: 'm-1003',
    fullName: 'Casey Morgan',
    email: 'casey.morgan@members.demo-fitness.example',
    plan: 'basic',
    club: 'Riverside',
    startDate: '2024-11-01',
    endDate: '2026-04-30',
  },
  {
    id: 'm-1004',
    fullName: 'Robin Patel',
    email: 'robin.patel@members.demo-fitness.example',
    plan: 'plus',
    club: 'Harbour',
    startDate: '2026-12-01',
  },
  {
    id: 'm-1005',
    fullName: 'Taylor Nguyen',
    email: 'taylor.nguyen@members.demo-fitness.example',
    plan: 'basic',
    club: 'Old Town',
    startDate: '2026-02-20',
  },
];
