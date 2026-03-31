export type StateCode = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'NT' | 'ACT';

export interface FuelPrices {
  ulp91: number;
  ulp95: number;
  ulp98: number;
  e10: number;
  diesel: number;
  premiumDiesel?: number;
  lpg: number;
}

export const FALLBACK_PRICES: Record<StateCode, FuelPrices> = {
  NSW: { ulp91: 182.4, ulp95: 196.1, ulp98: 206.3, e10: 174.8, diesel: 194.2, premiumDiesel: 199.1, lpg: 89.5 },
  VIC: { ulp91: 179.8, ulp95: 193.7, ulp98: 204.1, e10: 172.3, diesel: 191.8, premiumDiesel: 196.7, lpg: 87.2 },
  QLD: { ulp91: 184.6, ulp95: 198.2, ulp98: 208.9, e10: 176.4, diesel: 196.5, premiumDiesel: 201.4, lpg: 91.0 },
  WA:  { ulp91: 188.3, ulp95: 201.4, ulp98: 211.7, e10: 179.1, diesel: 199.3, premiumDiesel: 204.2, lpg: 93.4 },
  SA:  { ulp91: 183.7, ulp95: 197.5, ulp98: 207.8, e10: 175.9, diesel: 195.7, premiumDiesel: 200.6, lpg: 90.1 },
  TAS: { ulp91: 186.2, ulp95: 199.8, ulp98: 210.1, e10: 177.6, diesel: 197.9, premiumDiesel: 202.8, lpg: 92.0 },
  NT:  { ulp91: 192.5, ulp95: 205.3, ulp98: 215.6, e10: 183.8, diesel: 203.4, premiumDiesel: 208.3, lpg: 96.2 },
  ACT: { ulp91: 181.9, ulp95: 195.6, ulp98: 205.9, e10: 174.1, diesel: 193.8, premiumDiesel: 198.7, lpg: 88.9 },
};

export const STATES: StateCode[] = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];

export const STATE_NAMES: Record<StateCode, string> = {
  NSW: 'New South Wales', VIC: 'Victoria', QLD: 'Queensland', WA: 'Western Australia',
  SA: 'South Australia', TAS: 'Tasmania', NT: 'Northern Territory', ACT: 'Australian Capital Territory',
};

export const FUEL_LABELS: Record<string, string> = {
  ulp91: 'Unleaded 91', ulp95: 'Unleaded 95', ulp98: 'Unleaded 98',
  e10: 'E10', diesel: 'Diesel', premiumDiesel: 'Premium Diesel', lpg: 'LPG',
};

export const CHEAPEST_STATIONS: Record<StateCode, Record<string, { name: string; suburb: string }>> = {
  NSW: { ulp91: { name: 'Costco Auburn', suburb: 'Auburn' }, diesel: { name: 'Metro Petroleum', suburb: 'Smithfield' }, ulp95: { name: 'Speedway', suburb: 'Prestons' }, ulp98: { name: 'Costco Marsden Park', suburb: 'Marsden Park' }, e10: { name: '7-Eleven', suburb: 'Blacktown' }, premiumDiesel: { name: 'BP', suburb: 'Penrith' }, lpg: { name: 'United', suburb: 'Liverpool' } },
  VIC: { ulp91: { name: 'Costco Docklands', suburb: 'Docklands' }, diesel: { name: 'United', suburb: 'Laverton' }, ulp95: { name: 'BP', suburb: 'Dandenong' }, ulp98: { name: 'Shell', suburb: 'Footscray' }, e10: { name: '7-Eleven', suburb: 'Thomastown' }, premiumDiesel: { name: 'Caltex', suburb: 'Epping' }, lpg: { name: 'Metro', suburb: 'Sunshine' } },
  QLD: { ulp91: { name: 'Costco Bundamba', suburb: 'Bundamba' }, diesel: { name: 'United', suburb: 'Rocklea' }, ulp95: { name: 'Puma', suburb: 'Eagle Farm' }, ulp98: { name: 'BP', suburb: 'Coorparoo' }, e10: { name: '7-Eleven', suburb: 'Slacks Creek' }, premiumDiesel: { name: 'Shell', suburb: 'Archerfield' }, lpg: { name: 'Liberty', suburb: 'Ipswich' } },
  WA: { ulp91: { name: 'Costco Perth', suburb: 'Perth Airport' }, diesel: { name: 'Puma', suburb: 'Kewdale' }, ulp95: { name: 'Vibe', suburb: 'Welshpool' }, ulp98: { name: 'BP', suburb: 'Cannington' }, e10: { name: 'Caltex', suburb: 'Bayswater' }, premiumDiesel: { name: 'Shell', suburb: 'Fremantle' }, lpg: { name: 'United', suburb: 'Midland' } },
  SA: { ulp91: { name: 'Costco Kilburn', suburb: 'Kilburn' }, diesel: { name: 'Liberty', suburb: 'Wingfield' }, ulp95: { name: 'OTR', suburb: 'Gepps Cross' }, ulp98: { name: 'BP', suburb: 'Thebarton' }, e10: { name: 'On The Run', suburb: 'Salisbury' }, premiumDiesel: { name: 'Shell', suburb: 'Mile End' }, lpg: { name: 'United', suburb: 'Elizabeth' } },
  TAS: { ulp91: { name: 'United', suburb: 'Moonah' }, diesel: { name: 'BP', suburb: 'Derwent Park' }, ulp95: { name: 'Shell', suburb: 'Glenorchy' }, ulp98: { name: 'Caltex', suburb: 'Hobart' }, e10: { name: 'Puma', suburb: 'Kingston' }, premiumDiesel: { name: 'BP', suburb: 'Launceston' }, lpg: { name: 'Metro', suburb: 'New Town' } },
  NT: { ulp91: { name: 'Puma', suburb: 'Stuart Park' }, diesel: { name: 'United', suburb: 'Winnellie' }, ulp95: { name: 'Shell', suburb: 'Palmerston' }, ulp98: { name: 'BP', suburb: 'Casuarina' }, e10: { name: 'Caltex', suburb: 'Berrimah' }, premiumDiesel: { name: 'Puma', suburb: 'East Arm' }, lpg: { name: 'BP', suburb: 'Darwin City' } },
  ACT: { ulp91: { name: 'Costco Canberra', suburb: 'Majura Park' }, diesel: { name: 'United', suburb: 'Fyshwick' }, ulp95: { name: 'Shell', suburb: 'Phillip' }, ulp98: { name: 'BP', suburb: 'Belconnen' }, e10: { name: '7-Eleven', suburb: 'Mitchell' }, premiumDiesel: { name: 'Caltex', suburb: 'Hume' }, lpg: { name: 'Metro', suburb: 'Queanbeyan' } },
};

// Generate fake yesterday prices (slightly different)
export function getYesterdayPrices(state: StateCode): FuelPrices {
  const today = FALLBACK_PRICES[state];
  const jitter = () => (Math.random() - 0.5) * 6;
  return {
    ulp91: +(today.ulp91 + jitter()).toFixed(1),
    ulp95: +(today.ulp95 + jitter()).toFixed(1),
    ulp98: +(today.ulp98 + jitter()).toFixed(1),
    e10: +(today.e10 + jitter()).toFixed(1),
    diesel: +(today.diesel + jitter()).toFixed(1),
    premiumDiesel: +(today.premiumDiesel! + jitter()).toFixed(1),
    lpg: +(today.lpg + jitter()).toFixed(1),
  };
}

// Generate 7-day trend data
export function getTrendData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, i) => ({
    day,
    ulp91: +(180 + Math.sin(i * 0.8) * 4 + Math.random() * 2).toFixed(1),
    diesel: +(192 + Math.cos(i * 0.6) * 3 + Math.random() * 2).toFixed(1),
    ulp95: +(194 + Math.sin(i * 0.5) * 5 + Math.random() * 2).toFixed(1),
  }));
}

export function formatPrice(cents: number): string {
  return cents.toFixed(1);
}

export function formatCurrency(dollars: number): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(dollars);
}
