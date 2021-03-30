/* tslint:disable */
/* eslint-disable */
import { AtomLink } from './atom-link';
export interface LinkableDto {

  /**
   * The links associated to this resource, with `method`, `href` and `rel`.
   */
  links?: Array<AtomLink>;
}
