import { CamundaProcessDefinitionDto } from '@ng-camunda/./camunda-process-definition-dto';
import { CamundaVariableValueDto } from './camunda-variable-value-dto';

export interface ProcessStartFormDefinition {
  processDefinition:CamundaProcessDefinitionDto;
  processVariables:CamundaVariableValueDto;
  formKey:string;
  formioDefinition:any;
}
