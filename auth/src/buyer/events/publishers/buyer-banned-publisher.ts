import { Publisher, Subjects } from "@cardeal-test-microservice/common";
import { BuyerState, UserPrivilage } from "../../buyer-model";

interface BuyerBannedEvent {
  subject: Subjects.BuyerBanned;
  data: {
    id: string;
  };
}

export class BuyerBannedPublisher extends Publisher<BuyerBannedEvent> {
  subject: Subjects.BuyerBanned = Subjects.BuyerBanned;
}
