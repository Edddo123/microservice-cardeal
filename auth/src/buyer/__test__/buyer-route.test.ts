import { app } from "../../app";
import request from "supertest";
import { Buyer } from "../buyer-model";

describe("When signing up", () => {
  it("throws error for duplicate emails", async () => {
    const email = "test1@mail.ru";
    const password = "1234";
    const personalId = "12";
    await request(app)
      .post("/api/buyer")
      .send({ email, password, personalId })
      .expect(201);

    const response = await request(app)
      .post("/api/buyer")
      .send({ email, password, personalId })
      .expect(400);

    expect(response.text).toBe("email already exists");
  });

  it("saves user in the database", async () => {
    const email = "test1@mail.ru";
    const password = "1234";
    const personalId = "12";
    const response = await request(app)
      .post("/api/buyer")
      .send({ email, password, personalId })
      .expect(201);

    const buyer = await Buyer.findById(response.body._id);

    expect(buyer).toBeDefined();
  });
});

describe("When logging in", () => {
  it("throws error for invalid credentials", async () => {
    const email = "test1@mail.ru";
    const password = "1234";
    await request(app)
      .post("/api/buyer/login")
      .send({ email, password })
      .expect(400);
  });

  it("sets cookie upon success", async () => {
    const email = "test1@mail.ru";
    const password = "1234";
    const personalId = "12";

    await request(app)
      .post("/api/buyer")
      .send({ email, password, personalId })
      .expect(201);

    const response = await request(app)
      .post("/api/buyer/login")
      .send({ email, password })
      .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});

describe("When getting buyer", () => {
  it("returns unauthrozied without cookie", async () => {
    await request(app).get("/api/buyer").send().expect(400);
  });

  it("returns profile", async () => {
    const email = "test1@mail.ru";
    const password = "1234";
    const personalId = "12";

    await request(app)
      .post("/api/buyer")
      .send({ email, password, personalId })
      .expect(201);

    const response = await request(app)
      .post("/api/buyer/login")
      .send({ email, password })
      .expect(200);
    const cookie = response.get("Set-Cookie");
    const buyer = await request(app)
      .get("/api/buyer")
      .set("Cookie", cookie)
      .send()
      .expect(200);
    expect(buyer.body.buyer.email).toBe(email);
  });
});
