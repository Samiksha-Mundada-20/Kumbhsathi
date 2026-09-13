export interface StayOption {
  id: string;
  name: string;
  type: 'Dharamshala' | 'Budget hotel' | 'Mid hotel' | 'Camp';
  area: 'Ramkund' | 'Panchavati' | 'Trimbakeshwar' | 'Nashik Road' | 'Tapovan';
  pricePerNight: number;
  walkTimeMinutes: number;
  ghatReference: string;
  bookingUrl: string;
  notes: string;
  sourceStatus: 'verified' | 'official' | 'sample';
}

export const stayOptions: StayOption[] = [
  {
    id: 'st-1',
    name: 'Shri Ram Dharamshala',
    type: 'Dharamshala',
    area: 'Ramkund',
    pricePerNight: 350,
    walkTimeMinutes: 5,
    ghatReference: '~5 min walk to Ramkund Main Ghat',
    bookingUrl: 'https://nashik.gov.in',
    notes: 'Senior-citizen friendly, pure vegetarian canteen, 24/7 drinking water.',
    sourceStatus: 'verified'
  },
  {
    id: 'st-2',
    name: 'Ganga Niwas Pilgrims Lodge',
    type: 'Budget hotel',
    area: 'Panchavati',
    pricePerNight: 1100,
    walkTimeMinutes: 10,
    ghatReference: '~10 min walk to Kalaram Temple & Ramkund Gate 3',
    bookingUrl: 'https://www.booking.com',
    notes: 'Clean double rooms, power backup, hot water in mornings, luggage cloakroom.',
    sourceStatus: 'verified'
  },
  {
    id: 'st-3',
    name: 'Kumbh Sacred Tent City (Sector 2)',
    type: 'Camp',
    area: 'Tapovan',
    pricePerNight: 750,
    walkTimeMinutes: 15,
    ghatReference: '~15 min walk to Tapovan Shahi Bath Zone',
    bookingUrl: 'https://maharashtratourism.gov.in',
    notes: 'Government-approved tented cottages with perimeter security, clean community washrooms & medical desk.',
    sourceStatus: 'official'
  },
  {
    id: 'st-4',
    name: 'Trimbak Pilgrims Niwas (Akhada Complex)',
    type: 'Dharamshala',
    area: 'Trimbakeshwar',
    pricePerNight: 400,
    walkTimeMinutes: 8,
    ghatReference: '~8 min walk to Kushavarta Kund & Jyotirlinga Temple',
    bookingUrl: 'https://trimbakeshwar.org',
    notes: 'Ideal for yatris participating in Kushavarta Shahi Snan. Very peaceful early mornings.',
    sourceStatus: 'verified'
  },
  {
    id: 'st-5',
    name: 'Nashik Grand Comfort Inn',
    type: 'Mid hotel',
    area: 'Nashik Road',
    pricePerNight: 2400,
    walkTimeMinutes: 25,
    ghatReference: '~25 min connecting bus/auto ride to Ramkund Ghat',
    bookingUrl: 'https://www.makemytrip.com',
    notes: 'Air-conditioned rooms, elevator, in-house Satvik dining, 5 min from railway station.',
    sourceStatus: 'verified'
  },
  {
    id: 'st-6',
    name: 'Maheshwari Bhawan Dharamshala',
    type: 'Dharamshala',
    area: 'Panchavati',
    pricePerNight: 500,
    walkTimeMinutes: 12,
    ghatReference: '~12 min walk to Sita Gumpha & Ramkund',
    bookingUrl: 'https://nashik.gov.in',
    notes: 'Community managed trust facility with clean family rooms and subsidized Bhojanalaya.',
    sourceStatus: 'verified'
  }
];
