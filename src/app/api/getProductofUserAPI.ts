import { EventData, JoinEventData } from "@/app/lib/Interface/Menu";
import { authClient } from "../lib/auth-client";

export const getEventbyUser = async (): Promise<EventData[]> => {
  const { data: session } = await authClient.getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const { data: tokenData } = await authClient.token();
  if (!tokenData?.token) throw new Error("Unauthorized");

  const creatorID = session.user.id;

  try {
    //   /events/user/
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/user/${creatorID}`,
      {
        headers: { Authorization: `Bearer ${tokenData.token}` },
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

export const getEventbyUserParticipations = async (): Promise<
  JoinEventData[]
> => {
  const { data: session } = await authClient.getSession();

  const { data: tokenData } = await authClient.token();
  if (!tokenData?.token) throw new Error("Unauthorized");

  const joinUserID = session?.user.id;

  try {
    //   events/participations/:joinUserID
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/participations/${joinUserID}`,
      {
        headers: { Authorization: `Bearer ${tokenData.token}` },
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
