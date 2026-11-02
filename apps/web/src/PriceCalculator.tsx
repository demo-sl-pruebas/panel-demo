import {
  formatEuros,
  PLANS,
  priceMembership,
  type BillingCycle,
  type PlanId,
} from '@demo-fitness/core';
import { useState } from 'react';

export function PriceCalculator() {
  const [plan, setPlan] = useState<PlanId>('plus');
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [student, setStudent] = useState(false);
  const [familyMembers, setFamilyMembers] = useState(0);

  const price = priceMembership({ plan, cycle, student, familyMembers });

  return (
    <section aria-labelledby="calculator-heading" className="df-calculator">
      <h2 id="calculator-heading">Price calculator</h2>
      <label>
        Plan
        <select value={plan} onChange={(e) => setPlan(e.target.value as PlanId)}>
          {Object.values(PLANS).map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Billing
        <select value={cycle} onChange={(e) => setCycle(e.target.value as BillingCycle)}>
          <option value="monthly">Monthly</option>
          <option value="annual">Annual</option>
        </select>
      </label>
      <label>
        <input type="checkbox" checked={student} onChange={(e) => setStudent(e.target.checked)} />
        Student
      </label>
      <label>
        Family members
        <input
          type="number"
          min={0}
          max={4}
          value={familyMembers}
          onChange={(e) => setFamilyMembers(Number(e.target.value))}
        />
      </label>
      <p data-testid="price-total">
        Total: {formatEuros(price.totalCents)} ({price.totalDiscountPercent}% off)
      </p>
    </section>
  );
}
