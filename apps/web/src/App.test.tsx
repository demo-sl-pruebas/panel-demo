import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { App } from './App';

afterEach(cleanup);

describe('App', () => {
  it('shows the member counters', () => {
    render(<App today="2026-11-01" />);
    const active = screen.getByRole('region', { name: 'Active members' });
    expect(within(active).getByText('2')).toBeTruthy();
  });

  it('lists every member with a status badge', () => {
    render(<App today="2026-11-01" />);
    expect(screen.getAllByRole('row')).toHaveLength(6);
    expect(screen.getByText('expired')).toBeTruthy();
  });

  it('recalculates the price when the billing cycle changes', () => {
    render(<App today="2026-11-01" />);
    expect(screen.getByTestId('price-total').textContent).toBe('Total: €39.90 (0% off)');
    fireEvent.change(screen.getByLabelText('Billing'), { target: { value: 'annual' } });
    expect(screen.getByTestId('price-total').textContent).toBe('Total: €406.98 (15% off)');
  });
});
