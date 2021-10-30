import { Listener, Subjects } from "@cardeal-test-microservice/common";
import { Message } from "node-nats-streaming";
import { deleteDataRedis, setDataRedis } from "../../utils/redis-utils";
import { BuyerState, UserPrivilage, Buyer } from "../buyer-model";

interface BuyerUnbannedEvent {
  subject: Subjects.BuyerUnbanned;
  data: {
    id: string;
  };
}

export class BuyerUnbannedListener extends Listener<BuyerUnbannedEvent> {
  subject: Subjects.BuyerUnbanned = Subjects.BuyerUnbanned;
  queueGroupName = "post-srv";

  async onMessage(data: BuyerUnbannedEvent["data"], msg: Message) {
    console.log("unban received");
    await deleteDataRedis()(data.id.toString());

    msg.ack();
  }
}
