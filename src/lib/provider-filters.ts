export interface StreamingService {
  id: number;
  name: string;
  shortName: string;
}

export const STREAMING_SERVICES: StreamingService[] = [
  { id: 8, name: "Netflix", shortName: "Netflix" },
  { id: 337, name: "Disney Plus", shortName: "Disney+" },
  { id: 15, name: "Hulu", shortName: "Hulu" },
  { id: 1899, name: "Max", shortName: "Max" },
  { id: 9, name: "Amazon Prime Video", shortName: "Prime" },
  { id: 350, name: "Apple TV Plus", shortName: "Apple TV+" },
  { id: 386, name: "Peacock", shortName: "Peacock" },
  { id: 531, name: "Paramount Plus", shortName: "Paramount+" },
];
