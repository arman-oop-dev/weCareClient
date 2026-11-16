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

export const getProductAPI = async (): Promise<ProductData[]> => {
  const fetchData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/events");

  if (!fetchData.ok) {
    throw new Error("Failed to fetch events");
  }

  const response = await fetchData.json();

  return response.data;
};
