/* tslint:disable */
/* eslint-disable */
export interface CamundaFetchExternalTaskTopicDto {

  /**
   * A `String` value which enables the filtering of tasks based on process instance business key.
   */
  businessKey?: string;

  /**
   * Determines whether serializable variable values (typically variables that store custom Java objects)
   * should be deserialized on server side (default `false`).
   *
   * If set to `true`, a serializable variable will be deserialized on server side and transformed to JSON
   * using [Jackson's](https://github.com/FasterXML/jackson) POJO/bean property introspection feature. Note
   * that this requires the Java classes of the variable value to be on the REST API's classpath.
   *
   * If set to `false`, a serializable variable will be returned in its serialized format. For example, a
   * variable that is serialized as XML will be returned as a JSON string containing XML.
   */
  deserializeValues?: null | boolean;

  /**
   * Determines whether custom extension properties defined in the BPMN activity of the external task (e.g.
   * via the Extensions tab in the Camunda modeler) should be included in the response. Default: false
   */
  includeExtensionProperties?: null | boolean;

  /**
   * If `true` only local variables will be fetched.
   */
  localVariables?: null | boolean;

  /**
   * **Mandatory.** The duration to lock the external tasks for in milliseconds.
   */
  lockDuration: null | number;

  /**
   * Filter tasks based on process definition id.
   */
  processDefinitionId?: string;

  /**
   * Filter tasks based on process definition ids.
   */
  processDefinitionIdIn?: Array<string>;

  /**
   * Filter tasks based on process definition key.
   */
  processDefinitionKey?: string;

  /**
   * Filter tasks based on process definition keys.
   */
  processDefinitionKeyIn?: Array<string>;

  /**
   * Filter tasks based on process definition version tag.
   */
  processDefinitionVersionTag?: string;

  /**
   * A `JSON` object used for filtering tasks based on process instance variable values. A property name of
   * the object represents a process variable name, while the property value represents the process variable
   * value to filter tasks by.
   */
  processVariables?: { [key: string]: any };

  /**
   * Filter tasks based on tenant ids.
   */
  tenantIdIn?: Array<string>;

  /**
   * **Mandatory.** The topic's name.
   */
  topicName: string;

  /**
   * A JSON array of `String` values that represent variable names. For each result task belonging to this
   * topic, the given variables are returned as well if they are accessible from the external task's
   * execution. If not provided - all variables will be fetched.
   */
  variables?: Array<string>;

  /**
   * Filter tasks without tenant id.
   */
  withoutTenantId?: null | boolean;
}
