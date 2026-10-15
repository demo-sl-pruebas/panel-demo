import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Badge } from './Badge';

afterEach(cleanup);

describe('Badge', () => {
  it('uses the tone as a modifier class', () => {
    render(<Badge tone="success">active</Badge>);
    expect(screen.getByText('active').className).toBe('df-badge df-badge--success');
  });
});
