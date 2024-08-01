import axiosJwtReissue from "./index";

describe("axiosJwtReissue", () => {
  it('should log "axiosJwtReissue" to the console', () => {
    const consoleSpy = jest.spyOn(console, "log");

    axiosJwtReissue();

    expect(consoleSpy).toHaveBeenCalledWith("axiosJwtReissue");

    consoleSpy.mockRestore();
  });
});
