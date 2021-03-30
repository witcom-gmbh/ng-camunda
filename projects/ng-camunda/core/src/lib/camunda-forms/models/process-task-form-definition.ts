import { CamundaTaskDto,CamundaVariableValueDto } from '@ng-camunda/core/src/lib/camunda-engine';

export interface ProcessTaskFormDefinition {
  task:CamundaTaskDto;
  processVariables:CamundaVariableValueDto;
  formKey:string;
  formioDefinition:any;
}
