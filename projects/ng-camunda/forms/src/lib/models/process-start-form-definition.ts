import { CamundaProcessDefinitionDto,CamundaVariableValueDto } from '@ng-camunda/core';

export interface ProcessStartFormDefinition {
  processDefinition:CamundaProcessDefinitionDto;
  processVariables:CamundaVariableValueDto;
  formKey:string;
  formioDefinition:any;
}
