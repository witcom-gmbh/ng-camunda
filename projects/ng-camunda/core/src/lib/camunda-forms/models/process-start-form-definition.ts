import { CamundaProcessDefinitionDto,CamundaVariableValueDto } from '@ng-camunda/core/src/lib/camunda-engine';

export interface ProcessStartFormDefinition {
  processDefinition:CamundaProcessDefinitionDto;
  processVariables:CamundaVariableValueDto;
  formKey:string;
  formioDefinition:any;
}
