/* tslint:disable */
/* eslint-disable */
export interface IdentityLinkDto {

  /**
   * The id of the group participating in this link. Either `groupId` or `userId` is set.
   */
  groupId?: string;

  /**
   * The type of the identity link. The value of the this property can be user-defined. The Process Engine
   * provides three pre-defined Identity Link `type`s:
   *
   * * `candidate`
   * * `assignee` - reserved for the task assignee
   * * `owner` - reserved for the task owner
   *
   * **Note**: When adding or removing an Identity Link, the `type` property must be defined.
   */
  type: string;

  /**
   * The id of the user participating in this link. Either `userId` or `groupId` is set.
   */
  userId?: string;
}
