const versionController = require("./versionController");

describe("versionController", () => {
  it("returns basic public metadata", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    versionController.getVersion({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        project: "z-line-engine",
        visibility: "public-structure",
      }),
    );
  });
});
