import { Publisher, Subjects } from "@cardeal-test-microservice/common";
import { BuyerState, UserPrivilage } from "../../buyer-model";

interface BuyerUnbannedEvent {
  subject: Subjects.BuyerUnbanned;
  data: {
    id: string;
  };
}

export class BuyerUnbannedPublisher extends Publisher<BuyerUnbannedEvent> {
  subject: Subjects.BuyerUnbanned = Subjects.BuyerUnbanned;
}
