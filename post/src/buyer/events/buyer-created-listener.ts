import { Listener, Subjects } from "@cardeal-test-microservice/common";
import { Message } from "node-nats-streaming";
import { BuyerState, UserPrivilage, Buyer } from "../buyer-model";

interface BuyerCreatedEvent {
  subject: Subjects.BuyerCreated;
  data: {
    id: string;
    email: string;
    personalId: number;
    state: BuyerState;
    privilage: UserPrivilage;
  };
}

export class BuyerCreatedListener extends Listener<BuyerCreatedEvent> {
  subject: Subjects.BuyerCreated = Subjects.BuyerCreated;
  queueGroupName = "post-srv";

  async onMessage(data: BuyerCreatedEvent["data"], msg: Message) {
    const buyer = new Buyer({
      _id: data.id,
      email: data.email,
      personalId: data.personalId,
      state: data.state,
      privilage: data.privilage,
    });

    await buyer.save();

    msg.ack();
  }
}
