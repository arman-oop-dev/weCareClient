export interface Menu {
  label: string;
  href: string;
}

export interface ProductData {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorID: string;
  creatorEmail: string;
  creatorName: string;
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
