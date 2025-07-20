export interface PromoCode {
  code: string;
  discount: string;
  usage: string;
  expiry: string;
  status: 'Active' | 'Inactive';
  performance: string;
}

export const promoCodes: PromoCode[] = [
  {
    code: 'WELCOME20',
    discount: '20%',
    usage: '847 uses of 1,000 limit',
    expiry: '3/31/2024',
    status: 'Active',
    performance: '84.7%',
  },
  {
    code: 'BLACKFRIDAY',
    discount: '30%',
    usage: '423 uses of 500 limit',
    expiry: '3/31/2024',
    status: 'Active',
    performance: '84.7%',
  },
  {
    code: 'STUDENT15',
    discount: '15%',
    usage: '1,956 uses of 2,000 limit',
    expiry: '3/31/2024',
    status: 'Active',
    performance: '84.7%',
  },
  {
    code: 'LOYALTY10',
    discount: '10%',
    usage: '67 uses of 100 limit',
    expiry: '3/31/2024',
    status: 'Active',
    performance: '84.7%',
  },
];
