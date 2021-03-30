/* tslint:disable */
/* eslint-disable */
import { CamundaAtomLink } from './camunda-atom-link';
export interface CamundaLinkableDto {

  /**
   * The links associated to this resource, with `method`, `href` and `rel`.
   */
  links?: Array<CamundaAtomLink>;
}
