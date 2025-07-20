export interface FlightSearch {
  route: string;
  details: string;
  date: string;
  results: string;
  interaction: string;
  filters: string;
}

export const recentSearches: FlightSearch[] = [
  {
    route: 'NYC → LAX',
    details: 'Economy • 2 passengers',
    date: '2024-01-15',
    results: '47 results',
    interaction: '8 clicks',
    filters: 'Non-stop',
  },
  {
    route: 'LAX → MIA',
    details: 'Business • 1 passengers',
    date: '2024-01-15',
    results: '23 results',
    interaction: '3 clicks',
    filters: 'Non-stop',
  },
  {
    route: 'NYC → SFO',
    details: 'Economy • 4 passengers',
    date: '2024-01-15',
    results: '31 results',
    interaction: '5 clicks',
    filters: 'Non-stop',
  },
  {
    route: 'BOS → CHI',
    details: 'Premium • 2 passengers',
    date: '2024-01-15',
    results: '31 results',
    interaction: '12 clicks',
    filters: 'Non-stop',
  },

];
