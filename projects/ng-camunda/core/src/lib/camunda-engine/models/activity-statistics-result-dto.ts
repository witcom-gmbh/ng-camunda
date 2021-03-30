/* tslint:disable */
/* eslint-disable */
import { IncidentStatisticsResultDto } from './incident-statistics-result-dto';
export interface ActivityStatisticsResultDto {

  /**
   * The total number of failed jobs for the running instances.
   * **Note**: Will be `0` (not `null`), if failed jobs were excluded.
   */
  failedJobs?: number;

  /**
   * The id of the activity the results are aggregated for.
   */
  id?: string;

  /**
   * Each item in the resulting array is an object which contains `incidentType` and `incidentCount`.
   * **Note**: Will be an empty array, if `incidents` or `incidentsForType` were excluded.
   * Furthermore, the array will be also empty if no incidents were found.
   */
  incidents?: Array<IncidentStatisticsResultDto>;

  /**
   * The total number of running process instances of this activity.
   */
  instances?: number;
}
