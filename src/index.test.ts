import axiosJwtRefresh from "./index";

describe("axiosJwtRefresh", () => {
  it('should log "axiosJwtRefresh" to the console', () => {
    const consoleSpy = jest.spyOn(console, "log");

    axiosJwtRefresh();

    expect(consoleSpy).toHaveBeenCalledWith("axiosJwtRefresh");

    consoleSpy.mockRestore();
  });
});
