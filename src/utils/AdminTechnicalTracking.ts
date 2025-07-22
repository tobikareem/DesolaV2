export interface AdminMetricItem {
  label: string;
  value: string;
  color: 'blue' | 'orange' | 'green';
}

export interface AdminMetricCardData {
  title: string;
  subtitle: string;
  items: AdminMetricItem[];
}
