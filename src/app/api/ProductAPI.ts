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
  if (!session?.user) throw new Error("Unauthorized");

  const creatorID = session.user.id;

  const { data: tokenData } = await authClient.token();
  if (!tokenData?.token) throw new Error("Unauthorized");

  // /events/user/:creatorID
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events/user/${creatorID}`,
    {
      headers: { Authorization: `Bearer ${tokenData.token}` },
      cache: "no-store",
    },
  );

  const result = await res.json();
  return result.data;
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
