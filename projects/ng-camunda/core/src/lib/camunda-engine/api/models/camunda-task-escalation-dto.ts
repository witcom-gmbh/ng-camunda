/* tslint:disable */
/* eslint-disable */
import { CamundaVariableValueDto } from './camunda-variable-value-dto';
export interface CamundaTaskEscalationDto {

  /**
   * An escalation code that indicates the predefined escalation. It is used to identify
   * the BPMN escalation handler.
   */
  escalationCode?: string;

  /**
   * A JSON object containing variable key-value pairs.
   */
  variables?: { [key: string]: CamundaVariableValueDto };
}
