/* tslint:disable */
/* eslint-disable */
export interface SchemaLogQueryDto {

  /**
   * A JSON array of criteria to sort the result by. Each element of the array is
   *                       a JSON object that specifies one ordering. The position in the array
   *                       identifies the rank of an ordering, i.e., whether it is primary, secondary,
   *                       etc.
   */
  sorting?: Array<{ 'sortBy'?: 'timestamp', 'sortOrder'?: 'asc' | 'desc' }>;

  /**
   * The version of the schema.
   */
  version?: string;
}
