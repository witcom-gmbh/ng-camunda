/* tslint:disable */
/* eslint-disable */
export interface CamundaIncidentDto {

  /**
   * The id of the activity this incident is associated with.
   */
  activityId?: string;

  /**
   * The id of the associated cause incident which has been triggered.
   */
  causeIncidentId?: string;

  /**
   * The payload of this incident.
   */
  configuration?: string;

  /**
   * The id of the execution this incident is associated with.
   */
  executionId?: string;

  /**
   * The id of the activity on which the last exception occurred.
   */
  failedActivityId?: string;

  /**
   * The id of the incident.
   */
  id?: string;

  /**
   * The message of this incident.
   */
  incidentMessage?: string;

  /**
   * The time this incident happened. By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/),
   * the date must have the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.000+0200`.
   */
  incidentTimestamp?: null | string;

  /**
   * The type of incident, for example: `failedJobs` will be returned in case of an incident which identified
   * a failed job during the execution of a process instance. See the
   * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types) for a list of incident types.
   */
  incidentType?: string;

  /**
   * The job definition id the incident is associated with.
   */
  jobDefinitionId?: string;

  /**
   * The id of the process definition this incident is associated with.
   */
  processDefinitionId?: string;

  /**
   * The id of the process instance this incident is associated with.
   */
  processInstanceId?: string;

  /**
   * The id of the associated root cause incident which has been triggered.
   */
  rootCauseIncidentId?: string;

  /**
   * The id of the tenant this incident is associated with.
   */
  tenantId?: string;
}
