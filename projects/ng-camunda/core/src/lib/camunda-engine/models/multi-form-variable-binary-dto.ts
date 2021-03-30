/* tslint:disable */
/* eslint-disable */
export interface MultiFormVariableBinaryDto {

  /**
   * The binary data to be set.
   * For File variables, this multipart can contain the filename, binary value and MIME type of the file variable to be set
   * Only the filename is mandatory.
   */
  data?: null | Blob;

  /**
   * The name of the variable type. Either Bytes for a byte array variable or File for a file variable.
   */
  valueType?: 'Bytes' | 'File';
}
