import { CamundaTaskDto,CamundaVariableValueDto } from '@ng-camunda/core';

export interface ProcessTaskFormDefinition {
  task:CamundaTaskDto;
  processVariables:CamundaVariableValueDto;
  formKey:string;
  formioDefinition:any;
}
