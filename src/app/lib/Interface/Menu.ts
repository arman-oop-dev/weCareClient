export interface Menu {
  label: string;
  href: string;
}

export interface EventData {
  _id: string;
  joinUserID: string;
  creatorID: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

export interface JoinEventData {
  _id: string;
  eventId: string;
  joinUserID: string;
  creatorID: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}
