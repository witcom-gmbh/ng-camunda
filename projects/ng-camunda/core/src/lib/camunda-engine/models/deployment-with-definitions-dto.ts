/* tslint:disable */
/* eslint-disable */
import { CaseDefinitionDto } from './case-definition-dto';
import { DecisionDefinitionDto } from './decision-definition-dto';
import { DecisionRequirementsDefinitionDto } from './decision-requirements-definition-dto';
import { DeploymentDto } from './deployment-dto';
import { ProcessDefinitionDto } from './process-definition-dto';
export interface DeploymentWithDefinitionsDto extends DeploymentDto {

  /**
   * A JSON Object containing a property for each of the case definitions,
   * which are successfully deployed with that deployment.
   * The key is the case definition id, the value is a JSON Object corresponding to the case definition.
   */
  deployedCaseDefinitions?: { [key: string]: CaseDefinitionDto };

  /**
   * A JSON Object containing a property for each of the decision definitions,
   * which are successfully deployed with that deployment.
   * The key is the decision definition id, the value is a JSON Object corresponding to the decision definition.
   */
  deployedDecisionDefinitions?: { [key: string]: DecisionDefinitionDto };

  /**
   * A JSON Object containing a property for each of the decision requirements definitions,
   * which are successfully deployed with that deployment.
   * The key is the decision requirements definition id, the value is a JSON Object corresponding to the decision requirements definition.
   */
  deployedDecisionRequirementsDefinitions?: { [key: string]: DecisionRequirementsDefinitionDto };

  /**
   * A JSON Object containing a property for each of the process definitions,
   * which are successfully deployed with that deployment.
   * The key is the process definition id, the value is a JSON Object corresponding to the process definition.
   */
  deployedProcessDefinitions?: { [key: string]: ProcessDefinitionDto };
}
