/* tslint:disable */
/* eslint-disable */
import { ActivityInstanceIncidentDto } from './activity-instance-incident-dto';
import { TransitionInstanceDto } from './transition-instance-dto';

/**
 * A JSON object corresponding to the Activity Instance tree of the given process instance.
 */
export interface ActivityInstanceDto {

  /**
   * The id of the activity.
   */
  activityId?: string;

  /**
   * The name of the activity
   */
  activityName?: string;

  /**
   * The type of activity (corresponds to the XML element name in the BPMN 2.0, e.g., 'userTask')
   */
  activityType?: string;

  /**
   * A list of child activity instances.
   */
  childActivityInstances?: Array<ActivityInstanceDto>;

  /**
   * A list of child transition instances.
   * A transition instance represents an execution waiting in an asynchronous continuation.
   */
  childTransitionInstances?: Array<TransitionInstanceDto>;

  /**
   * A list of execution ids.
   */
  executionIds?: Array<string>;

  /**
   * The id of the activity instance.
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
   * The id of the process instance this activity instance is part of.
   */
  processInstanceId?: string;
}
