import type { IAxiosJwtRefreshOption } from "./types";

/**
  @param {AxiosJwtRefreshOption} defaultOption - default option
  @param {AxiosJwtRefreshOption} option - option provided by the user
  @returns - merged option
  @description - Merge the default option with the provided option
 */
const getMergedOption = (
  defaultOption: IAxiosJwtRefreshOption,
  option: IAxiosJwtRefreshOption,
) => {
  return {
    ...defaultOption,
    ...option,
  };
};

export default getMergedOption;
