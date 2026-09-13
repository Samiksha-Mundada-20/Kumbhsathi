export interface KumbhEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  type: 'Shahi Snan' | 'Aarti' | 'Ceremony' | 'Cultural';
  source: string;
 sourceStatus: 'official' | 'verified';
}

export const kumbhEvents: KumbhEvent[] = [
  {
    id: 'event-1',
    name: 'Flag Hoisting (Dhwajarohan)',
    date: '2026-10-31',
    time: '06:00 AM',
    location: 'Ramkund, Nashik',
    type: 'Ceremony',
    source: 'Nashik District Gazette',
    sourceStatus: 'official'
  },
  {
    id: 'event-2',
    name: 'First Shahi Snan (Shravan Amavasya)',
    date: '2027-08-02',
    time: '04:30 AM',
    location: 'Ramkund, Nashik & Kushavarta, Trimbak',
    type: 'Shahi Snan',
    source: 'Maharashtra State Kumbh Cell',
    sourceStatus: 'official'
  },
  {
    id: 'event-3',
    name: 'Second Shahi Snan (Bhadrapad Amavasya)',
    date: '2027-08-31',
    time: '04:00 AM',
    location: 'Ramkund, Nashik',
    type: 'Shahi Snan',
    source: 'Maharashtra State Kumbh Cell',
    sourceStatus: 'official'
  },
  {
    id: 'event-4',
    name: 'Third Shahi Snan (Bhadrapad Shukla Dwadashi)',
    date: '2027-09-11',
    time: '05:00 AM',
    location: 'Ramkund & Trimbakeshwar',
    type: 'Shahi Snan',
    source: 'Maharashtra State Kumbh Cell',
    sourceStatus: 'official'
  },
  {
    id: 'event-5',
    name: 'Daily Evening Godavari Maha Aarti',
    date: 'Daily',
    time: '06:30 PM',
    location: 'Ramkund Ghat, Nashik',
    type: 'Aarti',
    source: 'Ramkund Pujari Trust',
    sourceStatus: 'verified'
  }
];
