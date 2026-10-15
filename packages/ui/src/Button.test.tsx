import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

afterEach(cleanup);

describe('Button', () => {
  it('renders a primary button by default', () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.className).toContain('df-button--primary');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('calls onClick', () => {
    const onClick = vi.fn();
    render(
      <Button variant="danger" onClick={onClick}>
        Cancel membership
      </Button>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel membership' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
