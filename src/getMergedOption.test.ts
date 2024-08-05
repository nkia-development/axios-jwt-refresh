import getMergedOption from "./getMergedOption";

describe("getMergedOption", () => {
  it("should return the merged option when both options are provided", () => {
    const defaultOption = {
      statusCodes: [401],
      shouldRefresh: false,
      otherOption: "test",
    };
    const option = {
      statusCodes: [401, 403],
      shouldRefresh: true,
    };
    const result = getMergedOption(defaultOption, option);

    expect(result).toEqual({
      statusCodes: [401, 403],
      shouldRefresh: true,
      otherOption: "test",
    });
  });

  it("should return default options when no option is provided", () => {
    const defaultOption = {
      statusCodes: [401],
      shouldRefresh: false,
      otherOption: "test",
    };
    const option = {};
    const result = getMergedOption(defaultOption, option);

    expect(result).toEqual({
      statusCodes: [401],
      shouldRefresh: false,
      otherOption: "test",
    });
  });

  it("should return option values when default option is empty", () => {
    const defaultOption = {};
    const option = {
      statusCodes: [403],
      shouldRefresh: true,
      otherOption: "example",
    };
    const result = getMergedOption(defaultOption, option);

    expect(result).toEqual({
      statusCodes: [403],
      shouldRefresh: true,
      otherOption: "example",
    });
  });

  it("should override array values in default options with array values from option", () => {
    const defaultOption = {
      statusCodes: [401],
      shouldRefresh: false,
      otherOption: "test",
    };
    const option = {
      statusCodes: [403, 404],
    };
    const result = getMergedOption(defaultOption, option);

    expect(result).toEqual({
      statusCodes: [403, 404],
      shouldRefresh: false,
      otherOption: "test",
    });
  });

  it("should not modify the defaultOption object", () => {
    const defaultOption = {
      statusCodes: [401],
      shouldRefresh: false,
      otherOption: "test",
    };
    const option = {
      statusCodes: [403],
      shouldRefresh: true,
    };
    const originalDefaultOption = { ...defaultOption };
    getMergedOption(defaultOption, option);

    expect(defaultOption).toEqual(originalDefaultOption);
  });

  it("should return an empty object when both options are empty", () => {
    const defaultOption = {
      statusCodes: [401],
      shouldRefresh: false,
      otherOption: "test",
    };
    const option = {};
    const result = getMergedOption(defaultOption, option);

    expect(result).toEqual({
      statusCodes: [401],
      shouldRefresh: false,
      otherOption: "test",
    });
  });
});
