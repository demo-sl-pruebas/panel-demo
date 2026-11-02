import {
  countByStatus,
  formatEuros,
  memberStatus,
  PLANS,
  type Member,
  type MemberStatus,
} from '@demo-fitness/core';
import { Badge, StatCard, type BadgeTone } from '@demo-fitness/ui';
import { PriceCalculator } from './PriceCalculator';
import { SAMPLE_MEMBERS } from './members';

const STATUS_TONE: Record<MemberStatus, BadgeTone> = {
  active: 'success',
  frozen: 'warning',
  expired: 'danger',
  upcoming: 'info',
};

export interface AppProps {
  today: string;
  members?: Member[];
}

export function App({ today, members = SAMPLE_MEMBERS }: AppProps) {
  const counts = countByStatus(members, today);
  return (
    <main className="df-app">
      <header>
        <h1>Demo Fitness admin</h1>
      </header>

      <div className="df-stats">
        <StatCard label="Active members" value={counts.active} />
        <StatCard label="Frozen" value={counts.frozen} />
        <StatCard label="Starting soon" value={counts.upcoming} />
      </div>

      <section aria-labelledby="members-heading">
        <h2 id="members-heading">Members</h2>
        <table className="df-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Club</th>
              <th scope="col">Plan</th>
              <th scope="col">Monthly price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => {
              const status = memberStatus(member, today);
              const plan = PLANS[member.plan];
              return (
                <tr key={member.id}>
                  <td>{member.fullName}</td>
                  <td>{member.club}</td>
                  <td>{plan.name}</td>
                  <td>{formatEuros(plan.monthlyPriceCents)}</td>
                  <td>
                    <Badge tone={STATUS_TONE[status]}>{status}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <PriceCalculator />
    </main>
  );
}
