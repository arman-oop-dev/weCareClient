import { getEventbyUserParticipations } from "@/app/api/getProductofUserAPI";

const MyParticipateEvent = async () => {
  const joinedEventData = await getEventbyUserParticipations();
  console.log(joinedEventData);
  return <div></div>;
};

export default MyParticipateEvent;
