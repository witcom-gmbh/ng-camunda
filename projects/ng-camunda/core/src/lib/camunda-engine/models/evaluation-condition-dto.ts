/* tslint:disable */
/* eslint-disable */
import { VariableValueDto } from './variable-value-dto';
export interface EvaluationConditionDto {

  /**
   * Used for the process instances that have been triggered after the evaluation.
   */
  businessKey?: string;

  /**
   * Used to evaluate conditions of the process definition with the given id.
   */
  processDefinitionId?: string;

  /**
   * Used to evaluate a condition for a tenant with the given id.
   * Will only evaluate conditions of process definitions which belong to the tenant.
   */
  tenantId?: string;

  /**
   * A map of variables which are used for evaluation of the conditions and are injected into the process instances which have been triggered.
   * Each key is a variable name and each value a JSON variable value object with the following properties.
   */
  variables?: { [key: string]: VariableValueDto };

  /**
   * A Boolean value that indicates whether the conditions should only be evaluated of process definitions which belong to no tenant or not.
   * Value may only be true, as false is the default behavior.
   */
  withoutTenantId?: null | boolean;
}
