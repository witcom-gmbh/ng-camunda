/* tslint:disable */
/* eslint-disable */
export interface IncidentStatisticsResultDto {

  /**
   * The total number of incidents for the corresponding incident type.
   */
  incidentCount?: number;

  /**
   * The type of the incident the number of incidents is aggregated for. See the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/incidents/#incident-types) for a list of incident types.
   */
  incidentType?: string;
}
