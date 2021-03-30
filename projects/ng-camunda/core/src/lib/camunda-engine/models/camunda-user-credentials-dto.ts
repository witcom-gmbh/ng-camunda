/* tslint:disable */
/* eslint-disable */
export interface CamundaUserCredentialsDto {

  /**
   * The password of the authenticated user who changes the password of the user
   * (i.e., the user with passed id as path parameter).
   */
  authenticatedUserPassword?: string;

  /**
   * The users new password.
   */
  password?: string;
}
