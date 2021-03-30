/* tslint:disable */
/* eslint-disable */
import { CamundaVariableValueDto } from './camunda-variable-value-dto';
export interface CamundaPatchVariablesDto {

  /**
   * An array of String keys of variables to be deleted.
   */
  deletions?: Array<string>;

  /**
   * A JSON object containing variable key-value pairs.
   */
  modifications?: { [key: string]: CamundaVariableValueDto };
}
