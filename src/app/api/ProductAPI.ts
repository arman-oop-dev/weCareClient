import { authClient } from "../lib/auth-client";
import { JoinEventData, ProductData } from "../lib/Interface/Menu";

export const getProductAPI = async (): Promise<ProductData[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
  if (!response.ok) {
    throw new Error(`Failed to fetch events (${response.status})`);
  }
  const result = await response.json();
  return result.data;
};

export const getEventsByUser = async (): Promise<ProductData[]> => {
  const { data: session } = await authClient.getSession();

  if (!session?.user) {
    throw new Error("Unauthorized: User session not found");
  }

  const creatorID = session.user.id;

  const { data: tokenData } = await authClient.token();

  if (!tokenData?.token) {
    throw new Error("Unauthorized: Access token not found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events/user/${creatorID}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${tokenData.token}` },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || `Failed to fetch events: ${res.status}`);
  }

  const result = await res.json();

  return result.data ?? [];
};


export const getEventbyUserParticipations = async (): Promise<
  JoinEventData[]
> => {
  const { data: session } = await authClient.getSession();
  if (!session?.user) throw new Error("Unauthorized");
  const joinUserID = session.user.id;

  const { data: tokenData } = await authClient.token();
  if (!tokenData?.token) throw new Error("Unauthorized");

  try {
    const fetchData = await fetch(
      // /events/participations/:joinUserID
      `${process.env.NEXT_PUBLIC_API_URL}/events/participations/${joinUserID}`,
      {
        headers: { Authorization: `Bearer ${tokenData.token}` },
        cache: "no-store",
      },
    );

    if (!fetchData.ok) {
      throw new Error("Failed to fetch events");
    }

    const response = await fetchData.json();

    return response.data;
  } catch (err) {
    throw err;
  }
};
