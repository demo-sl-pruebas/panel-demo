import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { StatCard } from './StatCard';

afterEach(cleanup);

describe('StatCard', () => {
  it('renders label, value and hint inside a labelled region', () => {
    render(<StatCard label="Active members" value={42} hint="+3 this week" />);
    const region = screen.getByRole('region', { name: 'Active members' });
    expect(region.textContent).toContain('42');
    expect(region.textContent).toContain('+3 this week');
  });
});
