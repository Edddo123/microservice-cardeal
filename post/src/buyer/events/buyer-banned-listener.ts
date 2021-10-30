import { Listener, Subjects } from "@cardeal-test-microservice/common";
import { Message } from "node-nats-streaming";
import { setDataRedis } from "../../utils/redis-utils";
import { BuyerState, UserPrivilage, Buyer } from "../buyer-model";

interface BuyerBannedEvent {
  subject: Subjects.BuyerBanned;
  data: {
    id: string;
  };
}

export class BuyerBannedListener extends Listener<BuyerBannedEvent> {
  subject: Subjects.BuyerBanned = Subjects.BuyerBanned;
  queueGroupName = "post-srv";

  async onMessage(data: BuyerBannedEvent["data"], msg: Message) {
    console.log("ban received");
    await setDataRedis()(data.id.toString(), "banned", "EX", 600); // good idea to pass expiration time on event publish

    msg.ack();
  }
}
