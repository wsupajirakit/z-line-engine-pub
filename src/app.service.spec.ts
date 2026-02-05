import { AppService } from "./app.service";

describe("AppService", () => {
  it("returns public placeholder text", () => {
    const service = new AppService();
    expect(service.getHello()).toBe("Z Line Engine (public structure)");
  });
});
