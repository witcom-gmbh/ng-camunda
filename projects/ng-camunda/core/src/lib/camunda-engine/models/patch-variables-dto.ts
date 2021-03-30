/* tslint:disable */
/* eslint-disable */
import { VariableValueDto } from './variable-value-dto';
export interface PatchVariablesDto {

  /**
   * An array of String keys of variables to be deleted.
   */
  deletions?: Array<string>;

  /**
   * A JSON object containing variable key-value pairs.
   */
  modifications?: { [key: string]: VariableValueDto };
}
