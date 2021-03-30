/* tslint:disable */
/* eslint-disable */

/**
 * An activity instance, incident pair.
 */
export interface CamundaActivityInstanceIncidentDto {

  /**
   * The id of the incident.
   */
  id?: string;

  /**
   * The activity id in which the incident happened.
   */
  parentActivityInstanceId?: string;
}
