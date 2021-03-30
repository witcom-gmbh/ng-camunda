/* tslint:disable */
/* eslint-disable */
import { CamundaExceptionDto } from './camunda-exception-dto';
import { CamundaMissingAuthorizationDto } from './camunda-missing-authorization-dto';
export interface CamundaAuthorizationExceptionDto extends CamundaExceptionDto {
  missingAuthorizations?: Array<CamundaMissingAuthorizationDto>;

  /**
   * The id of the user that does not have expected permissions
   */
  userId?: string;
}
