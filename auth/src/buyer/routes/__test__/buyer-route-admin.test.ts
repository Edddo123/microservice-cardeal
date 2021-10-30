import { app } from "../../../app";
import request from "supertest";
import { Buyer, BuyerState, UserPrivilage } from "../../buyer-model";
import { hashPwd } from "../../utils/buyer-utils";
import { deleteDataRedis, getDataRedis, setDataRedis } from "../../utils/redis-utils";

describe("When banning user", () => {
  it("fails if you are not admin", async () => {
    const email = "test1@mail.ru";
    const password = "1234";
    const personalId = "12";

    await request(app)
      .post("/api/user/buyer")
      .send({ email, password, personalId })
      .expect(201);

    const response = await request(app)
      .post("/api/user/buyer/login")
      .send({ email, password })
      .expect(200);
    const cookie = response.get("Set-Cookie");

    const banResponse = await request(app)
      .put("/admin/user/buyer/ban")
      .set("Cookie", cookie)
      .send({ buyerId: "asda" })
      .expect(400);

    expect(banResponse.text).toBe("Not authorized");
  });

  it("bans user if you are admin", async () => {
    const email = "test1@mail.ru";
    const password = "1234";
    const hashedPassword = await hashPwd(password);
    const admin = new Buyer({
      email,
      password: hashedPassword,
      personalId: 12,
      privilage: UserPrivilage.Admin,
      state: BuyerState.Active,
    });
    await admin.save();
    console.log("admin user", admin);

    const normalUser = new Buyer({
      email: "123",
      password: "123",
      personalId: 12,
      privilage: UserPrivilage.Standard,
      state: BuyerState.Active,
    });
    await normalUser.save();

    const response = await request(app)
      .post("/api/user/buyer/login")
      .send({ email, password })
      .expect(200);
    const cookie = response.get("Set-Cookie");

    await request(app)
      .put("/admin/user/buyer/ban")
      .set("Cookie", cookie)
      .send({ buyerId: normalUser._id })
      .expect(200);

    const bannedUser = await Buyer.findById(normalUser._id);
    expect(bannedUser?.state).toBe(BuyerState.Banned);
    expect(setDataRedis).toHaveBeenCalled();
  });
});

describe("When unbanning user", () => {
  it("fails if you are not admin", async () => {
    const email = "test1@mail.ru";
    const password = "1234";
    const personalId = "12";

    await request(app)
      .post("/api/user/buyer")
      .send({ email, password, personalId })
      .expect(201);

    const response = await request(app)
      .post("/api/user/buyer/login")
      .send({ email, password })
      .expect(200);
    const cookie = response.get("Set-Cookie");

    const banResponse = await request(app)
      .put("/admin/user/buyer/unban")
      .set("Cookie", cookie)
      .send({ buyerId: "asda" })
      .expect(400);

    expect(banResponse.text).toBe("Not authorized");
  });

  it("unbans user if you are admin", async () => {
    const email = "test1@mail.ru";
    const password = "1234";
    const hashedPassword = await hashPwd(password);
    const admin = new Buyer({
      email,
      password: hashedPassword,
      personalId: 12,
      privilage: UserPrivilage.Admin,
      state: BuyerState.Active,
    });
    await admin.save();
    console.log("admin user", admin);

    const normalUser = new Buyer({
      email: "123",
      password: "123",
      personalId: 12,
      privilage: UserPrivilage.Standard,
      state: BuyerState.Active,
    });
    await normalUser.save();

    const response = await request(app)
      .post("/api/user/buyer/login")
      .send({ email, password })
      .expect(200);
    const cookie = response.get("Set-Cookie");

    await request(app)
      .put("/admin/user/buyer/ban")
      .set("Cookie", cookie)
      .send({ buyerId: normalUser._id })
      .expect(200);

    const bannedUser = await Buyer.findById(normalUser._id);
    expect(bannedUser?.state).toBe(BuyerState.Banned);

    await request(app)
      .put("/admin/user/buyer/unban")
      .set("Cookie", cookie)
      .send({ buyerId: normalUser._id })
      .expect(200);

    const unbannedUser = await Buyer.findById(normalUser._id);
    expect(unbannedUser?.state).toBe(BuyerState.Active);
    expect(deleteDataRedis).toHaveBeenCalled();
  });
});
