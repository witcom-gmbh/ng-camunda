/* tslint:disable */
/* eslint-disable */
import { ExceptionDto } from './exception-dto';
import { MissingAuthorizationDto } from './missing-authorization-dto';
export interface AuthorizationExceptionDto extends ExceptionDto {
  missingAuthorizations?: Array<MissingAuthorizationDto>;

  /**
   * The id of the user that does not have expected permissions
   */
  userId?: string;
}
