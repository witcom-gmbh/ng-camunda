/* tslint:disable */
/* eslint-disable */
export interface CamundaAbstractSetRemovalTimeDto {

  /**
   * The date for which the instances shall be removed. Value may not be `null`.
   *
   * **Note:** Cannot be set in conjunction with `clearedRemovalTime` or `calculatedRemovalTime`.
   */
  absoluteRemovalTime?: null | string;

  /**
   * The removal time is calculated based on the engine's configuration settings. Value may only be `true`, as `false` is the default behavior.
   *
   * **Note:** Cannot be set in conjunction with `absoluteRemovalTime` or `clearedRemovalTime`.
   */
  calculatedRemovalTime?: null | boolean;

  /**
   * Sets the removal time to `null`. Value may only be `true`, as `false` is the default behavior.
   *
   * **Note:** Cannot be set in conjunction with `absoluteRemovalTime` or `calculatedRemovalTime`.
   */
  clearedRemovalTime?: null | boolean;
}
