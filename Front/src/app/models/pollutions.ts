export interface Pollution {
  id: number;
  title: string;
  pollutionType: string;
  description: string;
  observationDate: string;
  location: string;
  latitude: number;
  longitude: number;
  photographUrl?: string | null;
}
