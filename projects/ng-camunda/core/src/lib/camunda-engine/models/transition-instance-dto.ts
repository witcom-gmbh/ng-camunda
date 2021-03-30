/* tslint:disable */
/* eslint-disable */
import { ActivityInstanceIncidentDto } from './activity-instance-incident-dto';

/**
 * A JSON object corresponding to the Activity Instance tree of the given process instance.
 */
export interface TransitionInstanceDto {

  /**
   * The id of the activity that this instance enters (asyncBefore job) or leaves (asyncAfter job)
   */
  activityId?: string;

  /**
   * The name of the activity that this instance enters (asyncBefore job) or leaves (asyncAfter job)
   */
  activityName?: string;

  /**
   * The type of the activity that this instance enters (asyncBefore job) or leaves (asyncAfter job)
   */
  activityType?: string;

  /**
   * The execution id.
   */
  executionId?: string;

  /**
   * The id of the transition instance.
   */
  id?: string;

  /**
   * A list of incident ids.
   */
  incidentIds?: Array<string>;

  /**
   * A list of JSON objects containing incident specific properties:
   * * `id`: the id of the incident
   * * `activityId`: the activity id in which the incident occurred
   */
  incidents?: Array<ActivityInstanceIncidentDto>;

  /**
   * The id of the parent activity instance, for example a sub process instance.
   */
  parentActivityInstanceId?: string;

  /**
   * The id of the process definition.
   */
  processDefinitionId?: string;

  /**
   * The id of the process instance this instance is part of.
   */
  processInstanceId?: string;
}
