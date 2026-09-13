export interface TravelOption {
  id: string;
  originCity: string;
  destinationCity: string;
  mode: 'Train' | 'Bus' | 'Flight';
  summary: string;
  operatorName: string;
  routeDetails: string;
  durationMinutes: number;
  farePerPerson: number;
  pros: string;
  cons: string;
  bookingUrl: string;
  notes: string;
  sourceStatus: 'verified' | 'official' | 'sample';
}

export const searchCities = [
  'Mumbai',
  'Pune',
  'Delhi',
  'Ahmedabad',
  'Bengaluru',
  'Hyderabad',
  'Nagpur',
  'Indore'
];

export const travelOptions: TravelOption[] = [
  // MUMBAI
  {
    id: 'tr-mum-1',
    originCity: 'Mumbai',
    destinationCity: 'Nashik Road',
    mode: 'Train',
    summary: 'Mumbai CSMT -> Nashik Road (Panchavati Express)',
    operatorName: 'Indian Railways (12109)',
    routeDetails: 'Departs 06:15 AM from CSMT, arrives 09:38 AM at Nashik Road',
    durationMinutes: 203,
    farePerPerson: 180,
    pros: 'Cheapest, punctual, morning arrival',
    cons: 'Requires advance booking during Kumbh',
    bookingUrl: 'https://www.irctc.co.in',
    notes: 'Daily superfast train. Ideal for morning arrival before afternoon ghat crowds.',
    sourceStatus: 'verified'
  },
  {
    id: 'tr-mum-2',
    originCity: 'Mumbai',
    destinationCity: 'Nashik Road',
    mode: 'Train',
    summary: 'Mumbai Dadar -> Nashik Road (Jan Shatabdi Express)',
    operatorName: 'Indian Railways (12071)',
    routeDetails: 'Departs 12:10 PM from Dadar, arrives 03:28 PM at Nashik Road',
    durationMinutes: 198,
    farePerPerson: 245,
    pros: 'Air-conditioned chair car options, clean',
    cons: 'Midday heat on arrival',
    bookingUrl: 'https://www.irctc.co.in',
    notes: 'Reserved seating only. Food available onboard.',
    sourceStatus: 'verified'
  },
  {
    id: 'bus-mum-1',
    originCity: 'Mumbai',
    destinationCity: 'Nashik Central Bus Stand (MSRTC)',
    mode: 'Bus',
    summary: 'Mumbai Thane -> Nashik CBS (MSRTC Shivneri AC Bus)',
    operatorName: 'MSRTC Shivneri',
    routeDetails: 'Buses every 30 mins from Thane Vandana Stand via NH160',
    durationMinutes: 240,
    farePerPerson: 420,
    pros: 'High frequency, no prior booking panic, comfortable AC',
    cons: 'Subject to Kasara Ghat traffic during peak Snan days',
    bookingUrl: 'https://msrtc.maharashtra.gov.in',
    notes: 'State transport buses have priority access corridors entering Nashik city.',
    sourceStatus: 'official'
  },
  {
    id: 'fl-mum-1',
    originCity: 'Mumbai',
    destinationCity: 'Nashik Ozar Airport (ISK)',
    mode: 'Flight',
    summary: 'Mumbai (BOM) -> Nashik (ISK)',
    operatorName: 'Alliance Air / IndiGo',
    routeDetails: 'Direct 50-minute regional shuttle flight',
    durationMinutes: 50,
    farePerPerson: 2200,
    pros: 'Fastest journey time, quiet airport',
    cons: 'Higher cost, Ozar is 24km north of Ramkund',
    bookingUrl: 'https://www.google.com/travel/flights',
    notes: 'Taxi from Ozar airport to Panchavati takes approx 35 minutes.',
    sourceStatus: 'verified'
  },

  // PUNE
  {
    id: 'tr-pun-1',
    originCity: 'Pune',
    destinationCity: 'Nashik Road',
    mode: 'Train',
    summary: 'Pune Jn -> Nashik Road (Pune-Ernakulam / Sahyadri Link)',
    operatorName: 'Indian Railways (11028)',
    routeDetails: 'Departs 07:30 AM from Pune Jn, arrives 11:45 AM at Nashik Road',
    durationMinutes: 255,
    farePerPerson: 210,
    pros: 'Direct rail link without transfer',
    cons: 'Limited daily train frequency',
    bookingUrl: 'https://www.irctc.co.in',
    notes: 'Popular route for western Maharashtra yatris.',
    sourceStatus: 'verified'
  },
  {
    id: 'bus-pun-1',
    originCity: 'Pune',
    destinationCity: 'Nashik CBS',
    mode: 'Bus',
    summary: 'Pune Swargate -> Nashik CBS (MSRTC Shivneri)',
    operatorName: 'MSRTC Shivneri AC',
    routeDetails: 'Frequent departures from Swargate and Shivaji Nagar via Sangamner NH60',
    durationMinutes: 270,
    farePerPerson: 490,
    pros: 'Hourly departures, drops right in city center',
    cons: 'Alephata traffic signals',
    bookingUrl: 'https://msrtc.maharashtra.gov.in',
    notes: 'Recommended for families traveling with luggage.',
    sourceStatus: 'official'
  },

  // DELHI
  {
    id: 'tr-del-1',
    originCity: 'Delhi',
    destinationCity: 'Nashik Road',
    mode: 'Train',
    summary: 'New Delhi (NDLS) -> Nashik Road (Mangala Lakshadweep Express)',
    operatorName: 'Indian Railways (12618)',
    routeDetails: 'Departs 05:25 AM NDLS, arrives 00:38 AM next day at Nashik Road',
    durationMinutes: 1153,
    farePerPerson: 650,
    pros: 'Direct long-distance train connecting North India to Kumbh',
    cons: 'Long 19-hour journey',
    bookingUrl: 'https://www.irctc.co.in',
    notes: 'Book 60-90 days in advance for confirmed sleeper/3AC berths.',
    sourceStatus: 'verified'
  },
  {
    id: 'fl-del-1',
    originCity: 'Delhi',
    destinationCity: 'Nashik Ozar Airport (ISK)',
    mode: 'Flight',
    summary: 'New Delhi (DEL) -> Nashik (ISK)',
    operatorName: 'IndiGo',
    routeDetails: 'Direct non-stop flight (2h 05m)',
    durationMinutes: 125,
    farePerPerson: 4200,
    pros: 'Reaches Nashik in just 2 hours from Capital',
    cons: 'Higher fare during peak Shahi Snan dates',
    bookingUrl: 'https://www.goindigo.in',
    notes: 'Fastest option for elderly pilgrims traveling from North India.',
    sourceStatus: 'verified'
  },

  // AHMEDABAD
  {
    id: 'tr-ahm-1',
    originCity: 'Ahmedabad',
    destinationCity: 'Nashik Road',
    mode: 'Train',
    summary: 'Ahmedabad Jn -> Nashik Road (Puri Express / Howrah Express)',
    operatorName: 'Indian Railways (12844)',
    routeDetails: 'Departs 07:00 PM, arrives 03:15 AM at Nashik Road via Surat and Nandurbar',
    durationMinutes: 495,
    farePerPerson: 380,
    pros: 'Overnight sleeper journey saves daytime',
    cons: 'Early morning 3 AM arrival',
    bookingUrl: 'https://www.irctc.co.in',
    notes: 'Dharamshalas near Nashik Road station offer early morning check-ins.',
    sourceStatus: 'verified'
  },
  {
    id: 'bus-ahm-1',
    originCity: 'Ahmedabad',
    destinationCity: 'Nashik Dwarka Circle',
    mode: 'Bus',
    summary: 'Ahmedabad Geeta Mandir -> Nashik (GSRTC / Private Sleeper)',
    operatorName: 'GSRTC / Shrinath Travels',
    routeDetails: 'Overnight AC Sleeper departing 08:30 PM via NH48 & Saputara Ghat',
    durationMinutes: 540,
    farePerPerson: 750,
    pros: 'Direct drop at Dwarka circle near Panchavati',
    cons: 'Winding ghat road near Saputara',
    bookingUrl: 'https://gsrtc.in',
    notes: 'Very popular with Gujarat pilgrims traveling in groups.',
    sourceStatus: 'verified'
  },

  // BENGALURU
  {
    id: 'fl-blr-1',
    originCity: 'Bengaluru',
    destinationCity: 'Nashik Ozar Airport (ISK)',
    mode: 'Flight',
    summary: 'Bengaluru (BLR) -> Nashik (ISK)',
    operatorName: 'IndiGo',
    routeDetails: 'Direct non-stop regional flight (1h 55m)',
    durationMinutes: 115,
    farePerPerson: 3800,
    pros: 'Direct connection from South India',
    cons: 'Limited daily flight slots',
    bookingUrl: 'https://www.goindigo.in',
    notes: 'Direct flight avoids Mumbai airport transit delays.',
    sourceStatus: 'verified'
  },
  {
    id: 'tr-blr-1',
    originCity: 'Bengaluru',
    destinationCity: 'Nashik Road',
    mode: 'Train',
    summary: 'Bengaluru (SBC) -> Nashik Road (Karnataka Express)',
    operatorName: 'Indian Railways (12627)',
    routeDetails: 'Departs 07:20 PM, arrives 06:10 PM next day at Nashik Road',
    durationMinutes: 1370,
    farePerPerson: 690,
    pros: 'Classic direct rail link, scenic Deccan plateau route',
    cons: '23-hour transit duration',
    bookingUrl: 'https://www.irctc.co.in',
    notes: 'Pack meals or order e-catering via IRCTC.',
    sourceStatus: 'verified'
  },

  // HYDERABAD
  {
    id: 'tr-hyd-1',
    originCity: 'Hyderabad',
    destinationCity: 'Nashik Road',
    mode: 'Train',
    summary: 'Secunderabad (SC) -> Nashik Road (Devagiri Express)',
    operatorName: 'Indian Railways (17058)',
    routeDetails: 'Departs 01:25 PM, arrives 04:20 AM next day at Nashik Road',
    durationMinutes: 895,
    farePerPerson: 460,
    pros: 'Direct overnight train via Aurangabad/Nanded',
    cons: '15 hour journey',
    bookingUrl: 'https://www.irctc.co.in',
    notes: 'Popular line for Telangana and Marathwada pilgrims.',
    sourceStatus: 'verified'
  },
  {
    id: 'bus-hyd-1',
    originCity: 'Hyderabad',
    destinationCity: 'Nashik CBS',
    mode: 'Bus',
    summary: 'MGBS Hyderabad -> Nashik CBS (TSRTC / Orange Travels AC Sleeper)',
    operatorName: 'Orange Travels / TSRTC',
    routeDetails: 'Daily multi-axle AC Sleeper departs 05:30 PM via Solapur-Ahmednagar',
    durationMinutes: 840,
    farePerPerson: 1100,
    pros: 'Comfortable sleeper berths, drops at central Nashik',
    cons: 'Long bus ride',
    bookingUrl: 'https://www.redbus.in',
    notes: 'Stops at reliable highway food courts for dinner and breakfast.',
    sourceStatus: 'verified'
  },

  // NAGPUR
  {
    id: 'tr-nag-1',
    originCity: 'Nagpur',
    destinationCity: 'Nashik Road',
    mode: 'Train',
    summary: 'Nagpur Jn -> Nashik Road (Sewagram Express / Vidarbha Express)',
    operatorName: 'Indian Railways (12106)',
    routeDetails: 'Departs 05:00 PM, arrives 03:00 AM at Nashik Road via Bhusawal',
    durationMinutes: 600,
    farePerPerson: 410,
    pros: 'Direct overnight train on Central Railway mainline',
    cons: 'Crowded during peak festival season',
    bookingUrl: 'https://www.irctc.co.in',
    notes: 'Multiple superfast trains connect Vidarbha to Nashik daily.',
    sourceStatus: 'verified'
  },
  {
    id: 'bus-nag-1',
    originCity: 'Nagpur',
    destinationCity: 'Nashik CBS',
    mode: 'Bus',
    summary: 'Nagpur Ganeshpeth -> Nashik (MSRTC Shivshahi AC / Samruddhi Corridor)',
    operatorName: 'MSRTC Shivshahi',
    routeDetails: 'Express overnight route via Samruddhi Mahamarg expressway',
    durationMinutes: 480,
    farePerPerson: 950,
    pros: 'Fast travel via Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Mahamarg',
    cons: 'Limited night pit-stops',
    bookingUrl: 'https://msrtc.maharashtra.gov.in',
    notes: 'Samruddhi Mahamarg drastically cut journey time between Nagpur and Nashik.',
    sourceStatus: 'official'
  },

  // INDORE
  {
    id: 'bus-ind-1',
    originCity: 'Indore',
    destinationCity: 'Nashik CBS',
    mode: 'Bus',
    summary: 'Indore Sarwate -> Nashik CBS (Interstate AC Sleeper)',
    operatorName: 'Hans Travels / Atal Indore City Transport',
    routeDetails: 'Departs 08:00 PM via Sendhwa & Dhule (NH52)',
    durationMinutes: 510,
    farePerPerson: 700,
    pros: 'Direct overnight journey connecting MP Malwa region to Nashik',
    cons: 'Single lane segments near MP-MH border checkpost',
    bookingUrl: 'https://www.redbus.in',
    notes: 'Convenient connection for pilgrims from Ujjain and Indore.',
    sourceStatus: 'verified'
  },
  {
    id: 'tr-ind-1',
    originCity: 'Indore',
    destinationCity: 'Nashik Road',
    mode: 'Train',
    summary: 'Indore Jn -> Nashik Road (via Manmad or Khandwa-Bhusawal connection)',
    operatorName: 'Indian Railways',
    routeDetails: 'Express connection via Khandwa / Bhusawal junction',
    durationMinutes: 660,
    farePerPerson: 420,
    pros: 'Economical rail option with reserved berths',
    cons: 'May require station transfer or link coach',
    bookingUrl: 'https://www.irctc.co.in',
    notes: 'Direct sleeper bus is often faster from Indore than connecting trains.',
    sourceStatus: 'verified'
  }
];
