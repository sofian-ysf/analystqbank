interface Window {
  gtag: (
    command: 'event',
    action: string,
    options?: {
      send_to?: string;
      value?: number;
      currency?: string;
      transaction_id?: string;
    }
  ) => void;
}
