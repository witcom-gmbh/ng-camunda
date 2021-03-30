/* tslint:disable */
/* eslint-disable */
export interface MultiFormAttachmentDto {

  /**
   * The description of the attachment.
   */
  'attachment-description'?: string;

  /**
   * The name of the attachment.
   */
  'attachment-name'?: string;

  /**
   * The type of the attachment.
   */
  'attachment-type'?: string;

  /**
   * The content of the attachment.
   */
  content?: null | Blob;

  /**
   * The url to the remote content of the attachment.
   */
  url?: string;
}
