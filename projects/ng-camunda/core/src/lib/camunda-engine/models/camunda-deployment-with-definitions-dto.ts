/* tslint:disable */
/* eslint-disable */
import { CamundaCaseDefinitionDto } from './camunda-case-definition-dto';
import { CamundaDecisionDefinitionDto } from './camunda-decision-definition-dto';
import { CamundaDecisionRequirementsDefinitionDto } from './camunda-decision-requirements-definition-dto';
import { CamundaDeploymentDto } from './camunda-deployment-dto';
import { CamundaProcessDefinitionDto } from './camunda-process-definition-dto';
export interface CamundaDeploymentWithDefinitionsDto extends CamundaDeploymentDto {

  /**
   * A JSON Object containing a property for each of the case definitions,
   * which are successfully deployed with that deployment.
   * The key is the case definition id, the value is a JSON Object corresponding to the case definition.
   */
  deployedCaseDefinitions?: { [key: string]: CamundaCaseDefinitionDto };

  /**
   * A JSON Object containing a property for each of the decision definitions,
   * which are successfully deployed with that deployment.
   * The key is the decision definition id, the value is a JSON Object corresponding to the decision definition.
   */
  deployedDecisionDefinitions?: { [key: string]: CamundaDecisionDefinitionDto };

  /**
   * A JSON Object containing a property for each of the decision requirements definitions,
   * which are successfully deployed with that deployment.
   * The key is the decision requirements definition id, the value is a JSON Object corresponding to the decision requirements definition.
   */
  deployedDecisionRequirementsDefinitions?: { [key: string]: CamundaDecisionRequirementsDefinitionDto };

  /**
   * A JSON Object containing a property for each of the process definitions,
   * which are successfully deployed with that deployment.
   * The key is the process definition id, the value is a JSON Object corresponding to the process definition.
   */
  deployedProcessDefinitions?: { [key: string]: CamundaProcessDefinitionDto };
}
