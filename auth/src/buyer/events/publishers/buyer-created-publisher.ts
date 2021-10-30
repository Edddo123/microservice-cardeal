import { Publisher, Subjects } from "@cardeal-test-microservice/common";
import { BuyerState, UserPrivilage } from "../../buyer-model";

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

export class BuyerCreatedPublisher extends Publisher<BuyerCreatedEvent> {
  subject: Subjects.BuyerCreated = Subjects.BuyerCreated;
}
