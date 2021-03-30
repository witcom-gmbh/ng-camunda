/* tslint:disable */
/* eslint-disable */
import { CamundaSortTaskQueryParametersDto } from './camunda-sort-task-query-parameters-dto';
import { CamundaVariableQueryParameterDto } from './camunda-variable-query-parameter-dto';

/**
 * A Task query which defines a group of Tasks.
 */
export interface CamundaTaskQueryDto {

  /**
   * Only include active tasks. Value may only be `true`, as `false`
   * is the default behavior.
   */
  active?: null | boolean;

  /**
   * Only include tasks which belong to one of the passed and comma-separated activity 
   * instance ids.
   */
  activityInstanceIdIn?: Array<string>;

  /**
   * If set to `true`, restricts the query to all tasks that are assigned.
   */
  assigned?: null | boolean;

  /**
   * Restrict to tasks that the given user is assigned to.
   */
  assignee?: string;

  /**
   * Restrict to tasks that the user described by the given expression is assigned to. See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions) 
   * for more information on available functions.
   */
  assigneeExpression?: string;

  /**
   * Only include tasks which are assigned to one of the passed and comma-separated user ids.
   */
  assigneeIn?: Array<string>;

  /**
   * Restrict to tasks that have an assignee that has the parameter 
   * value as a substring.
   */
  assigneeLike?: string;

  /**
   * Restrict to tasks that have an assignee that has the parameter value described by the 
   * given expression as a substring. See the 
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions) 
   * for more information on available functions.
   */
  assigneeLikeExpression?: string;

  /**
   * Only include tasks that are offered to the given group.
   */
  candidateGroup?: string;

  /**
   * Only include tasks that are offered to the group described by the given expression. 
   * See the 
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions) 
   * for more information on available functions.
   */
  candidateGroupExpression?: string;

  /**
   * Restrict to tasks that are offered to any of the given candidate groups. Takes a
   * comma-separated list of group names, so for example
   * `developers,support,sales`.
   */
  candidateGroups?: Array<string>;

  /**
   * Restrict to tasks that are offered to any of the candidate groups described by the
   * given expression. See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions. The expression must evaluate to
   * `java.util.List` of Strings.
   */
  candidateGroupsExpression?: string;

  /**
   * Only include tasks that are offered to the given user or to one of his groups.
   */
  candidateUser?: string;

  /**
   * Only include tasks that are offered to the user described by the given expression. 
   * See the 
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions) 
   * for more information on available functions.
   */
  candidateUserExpression?: string;

  /**
   * Restrict to tasks that belong to a case definition with the given id.
   */
  caseDefinitionId?: string;

  /**
   * Restrict to tasks that belong to a case definition with the given key.
   */
  caseDefinitionKey?: string;

  /**
   * Restrict to tasks that belong to a case definition with the given name.
   */
  caseDefinitionName?: string;

  /**
   * Restrict to tasks that have a case definition name that has the parameter value as a 
   * substring.
   */
  caseDefinitionNameLike?: string;

  /**
   * Restrict to tasks that belong to a case execution with the given id.
   */
  caseExecutionId?: string;

  /**
   * Restrict to tasks that belong to case instances with the given business key.
   */
  caseInstanceBusinessKey?: string;

  /**
   * Restrict to tasks that have a case instance business key that has the parameter value 
   * as a substring.
   */
  caseInstanceBusinessKeyLike?: string;

  /**
   * Restrict to tasks that belong to case instances with the given id.
   */
  caseInstanceId?: string;

  /**
   * A JSON array to only include tasks that belong to a case instance with variables
   * with certain values. The array consists of JSON objects with three properties
   * `name`, `operator` and `value`. `name` is the variable name, `operator` is the
   * comparison operator to be used and `value` the variable value. `value` may be of
   * type `String`, `Number` or `Boolean`.
   *
   * Valid `operator` values are:
   * `eq` - equal to;
   * `neq` - not equal to;
   * `gt` - greater than;
   * `gteq` - greater than or equal to;
   * `lt` - lower than;
   * `lteq` - lower than or equal to;
   * `like`.
   * `key` and `value` may not contain underscore or comma characters.
   */
  caseInstanceVariables?: Array<CamundaVariableQueryParameterDto>;

  /**
   * Restrict to tasks that were created after the given date. By
   * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must
   * have the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.342+0200`.
   */
  createdAfter?: null | string;

  /**
   * Restrict to tasks that were created after the date described by the given expression.
   * See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions. The expression must evaluate to a
   * `java.util.Date` or `org.joda.time.DateTime` object.
   */
  createdAfterExpression?: string;

  /**
   * Restrict to tasks that were created before the given date. By
   * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must
   * have the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.332+0200`.
   */
  createdBefore?: null | string;

  /**
   * Restrict to tasks that were created before the date described by the given expression.
   * See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions. The expression must evaluate to a
   * `java.util.Date` or `org.joda.time.DateTime` object.
   */
  createdBeforeExpression?: string;

  /**
   * Restrict to tasks that were created on the given date. By
   * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
   * the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.324+0200`.
   */
  createdOn?: null | string;

  /**
   * Restrict to tasks that were created on the date described by the given expression.
   * See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions. The expression must evaluate to a
   * `java.util.Date` or `org.joda.time.DateTime` object.
   */
  createdOnExpression?: string;

  /**
   * Restrict to tasks that are in the given delegation state. Valid values are
   * `PENDING` and `RESOLVED`.
   */
  delegationState?: 'PENDING' | 'RESOLVED';

  /**
   * Restrict to tasks that have the given description.
   */
  description?: string;

  /**
   * Restrict to tasks that have a description that has the parameter
   * value as a substring.
   */
  descriptionLike?: string;

  /**
   * Restrict to tasks that are due after the given date. By
   * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
   * the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.435+0200`.
   */
  dueAfter?: null | string;

  /**
   * Restrict to tasks that are due after the date described by the given expression.
   * See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions. The expression must evaluate to a
   * `java.util.Date` or `org.joda.time.DateTime` object.
   */
  dueAfterExpression?: string;

  /**
   * Restrict to tasks that are due before the given date. By
   * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
   * the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.243+0200`.
   */
  dueBefore?: null | string;

  /**
   * Restrict to tasks that are due before the date described by the given expression.
   * See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions. The expression must evaluate to a
   * `java.util.Date` or `org.joda.time.DateTime` object.
   */
  dueBeforeExpression?: string;

  /**
   * Restrict to tasks that are due on the given date. By
   * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the format
   * `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.546+0200`.
   */
  dueDate?: null | string;

  /**
   * Restrict to tasks that are due on the date described by the given expression. See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions. The expression must evaluate to a
   * `java.util.Date` or `org.joda.time.DateTime` object.
   */
  dueDateExpression?: string;

  /**
   * Restrict to tasks that belong to an execution with the given id.
   */
  executionId?: string;

  /**
   * Restrict to tasks that have a followUp date after the given date. By
   * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
   * the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.542+0200`.
   */
  followUpAfter?: null | string;

  /**
   * Restrict to tasks that have a followUp date after the date described by the given
   * expression. See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions. The expression must evaluate to a
   * `java.util.Date` or `org.joda.time.DateTime` object.
   */
  followUpAfterExpression?: string;

  /**
   * Restrict to tasks that have a followUp date before the given date. By
   * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
   * the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.234+0200`.
   */
  followUpBefore?: string;

  /**
   * Restrict to tasks that have a followUp date before the date described by the given
   * expression. See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions. The expression must evaluate to a
   * `java.util.Date` or `org.joda.time.DateTime` object.
   */
  followUpBeforeExpression?: string;

  /**
   * Restrict to tasks that have no followUp date or a followUp date before the given date.
   * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
   * the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.432+0200`. The typical use case
   * is to query all `active` tasks for a user for a given date.
   */
  followUpBeforeOrNotExistent?: null | string;

  /**
   * Restrict to tasks that have no followUp date or a followUp date before the date
   * described by the given expression. See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions. The expression must evaluate to a
   * `java.util.Date` or `org.joda.time.DateTime` object.
   */
  followUpBeforeOrNotExistentExpression?: string;

  /**
   * Restrict to tasks that have a followUp date on the given date. By
   * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date
   * must have the format `yyyy-MM-dd'T'HH:mm:ss.SSSZ`, e.g., `2013-01-23T14:42:45.342+0200`.
   */
  followUpDate?: null | string;

  /**
   * Restrict to tasks that have a followUp date on the date described by the given
   * expression. See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions. The expression must evaluate to a
   * `java.util.Date` or `org.joda.time.DateTime` object.
   */
  followUpDateExpression?: string;

  /**
   * Also include tasks that are assigned to users in candidate queries. Default is to only 
   * include tasks that are not assigned to any user if you query by candidate user or
   * group(s).
   */
  includeAssignedTasks?: null | boolean;

  /**
   * Only include tasks that the given user is involved in. A user is involved in a task if 
   * an identity link exists between task and user (e.g., the user is the assignee).
   */
  involvedUser?: string;

  /**
   * Only include tasks that the user described by the given expression is involved in.
   * A user is involved in a task if an identity link exists between task and user
   * (e.g., the user is the assignee). See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions.
   */
  involvedUserExpression?: string;

  /**
   * Restrict to tasks that have a lower or equal priority.
   */
  maxPriority?: null | number;

  /**
   * Restrict to tasks that have a higher or equal priority.
   */
  minPriority?: null | number;

  /**
   * Restrict to tasks that have the given name.
   */
  name?: string;

  /**
   * Restrict to tasks that have a name with the given parameter value as substring.
   */
  nameLike?: string;

  /**
   * Restrict to tasks that do not have the given name.
   */
  nameNotEqual?: string;

  /**
   * Restrict to tasks that do not have a name with the given parameter
   * value as substring.
   */
  nameNotLike?: string;

  /**
   * A JSON array of nested task queries with OR semantics. A task matches a nested query if it fulfills
   * *at least one* of the query's predicates. With multiple nested queries, a task must fulfill at least one predicate of *each* query ([Conjunctive Normal Form](https://en.wikipedia.org/wiki/Conjunctive_normal_form)).
   *
   * All task query properties can be used except for: `sorting`, `withCandidateGroups`,
   * `withoutCandidateGroups`, `withCandidateUsers`, `withoutCandidateUsers`
   *
   * See the [User guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/process-engine-api/#or-queries)
   * for more information about OR queries.
   */
  orQueries?: Array<CamundaTaskQueryDto>;

  /**
   * Restrict to tasks that the given user owns.
   */
  owner?: string;

  /**
   * Restrict to tasks that the user described by the given expression owns. See the 
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions) 
   * for more information on available functions.
   */
  ownerExpression?: string;

  /**
   * Restrict query to all tasks that are sub tasks of the given task. Takes a task id.
   */
  parentTaskId?: string;

  /**
   * Restrict to tasks that have the given priority.
   */
  priority?: null | number;

  /**
   * Restrict to tasks that belong to a process definition with the given id.
   */
  processDefinitionId?: string;

  /**
   * Restrict to tasks that belong to a process definition with the given key.
   */
  processDefinitionKey?: string;

  /**
   * Restrict to tasks that belong to a process definition with one of the given keys. The 
   * keys need to be in a comma-separated list.
   */
  processDefinitionKeyIn?: Array<string>;

  /**
   * Restrict to tasks that belong to a process definition with the given name.
   */
  processDefinitionName?: string;

  /**
   * Restrict to tasks that have a process definition name that has the parameter value as 
   * a substring.
   */
  processDefinitionNameLike?: string;

  /**
   * Restrict to tasks that belong to process instances with the given business key.
   */
  processInstanceBusinessKey?: string;

  /**
   * Restrict to tasks that belong to process instances with the given business key which 
   * is described by an expression. See the 
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
   * for more information on available functions.
   */
  processInstanceBusinessKeyExpression?: string;

  /**
   * Restrict to tasks that belong to process instances with one of the give business keys. 
   * The keys need to be in a comma-separated list.
   */
  processInstanceBusinessKeyIn?: Array<string>;

  /**
   * Restrict to tasks that have a process instance business key that has the parameter 
   * value as a substring.
   */
  processInstanceBusinessKeyLike?: string;

  /**
   * Restrict to tasks that have a process instance business key that has the parameter 
   * value as a substring and is described by an expression. See the
   * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions) 
   * for more information on available functions.
   */
  processInstanceBusinessKeyLikeExpression?: string;

  /**
   * Restrict to tasks that belong to process instances with the given id.
   */
  processInstanceId?: string;

  /**
   * Restrict to tasks that belong to process instances with the given ids.
   */
  processInstanceIdIn?: Array<string>;

  /**
   * A JSON array to only include tasks that belong to a process instance with variables
   * with certain values. The array consists of JSON objects with three properties
   * `name`, `operator` and `value`. `name` is the variable name, `operator` is the
   * comparison operator to be used and `value` the variable value. `value` may be of
   * type `String`, `Number` or `Boolean`.
   *
   * Valid `operator` values are:
   * `eq` - equal to;
   * `neq` - not equal to;
   * `gt` - greater than;
   * `gteq` - greater than or equal to;
   * `lt` - lower than;
   * `lteq` - lower than or equal to;
   * `like`.
   * `key` and `value` may not contain underscore or comma characters.
   */
  processVariables?: Array<CamundaVariableQueryParameterDto>;

  /**
   * Apply sorting of the result
   */
  sorting?: Array<{ 'sortBy'?: 'instanceId' | 'caseInstanceId' | 'dueDate' | 'executionId' | 'caseExecutionId' | 'assignee' | 'created' | 'description' | 'id' | 'name' | 'nameCaseInsensitive' | 'priority' | 'processVariable' | 'executionVariable' | 'taskVariable' | 'caseExecutionVariable' | 'caseInstanceVariable', 'sortOrder'?: 'asc' | 'desc', 'parameters'?: CamundaSortTaskQueryParametersDto }>;

  /**
   * Only include suspended tasks. Value may only be `true`, as
   * `false` is the default behavior.
   */
  suspended?: null | boolean;

  /**
   * Restrict to tasks that have the given key.
   */
  taskDefinitionKey?: string;

  /**
   * Restrict to tasks that have one of the given keys. The keys need to be in a comma-separated list.
   */
  taskDefinitionKeyIn?: Array<string>;

  /**
   * Restrict to tasks that have a key that has the parameter value as a substring.
   */
  taskDefinitionKeyLike?: string;

  /**
   * A JSON array to only include tasks that have variables with certain values. The
   * array consists of JSON objects with three properties `name`, `operator` and `value`.
   * `name` is the variable name, `operator` is the comparison operator to be used and
   * `value` the variable value. `value` may be of type `String`, `Number` or `Boolean`.
   *
   * Valid `operator` values are:
   * `eq` - equal to;
   * `neq` - not equal to;
   * `gt` - greater than;
   * `gteq` - greater than or equal to;
   * `lt` - lower than;
   * `lteq` - lower than or equal to;
   * `like`.
   * `key` and `value` may not contain underscore or comma characters.
   */
  taskVariables?: Array<CamundaVariableQueryParameterDto>;

  /**
   * Only include tasks which belong to one of the passed and comma-separated 
   * tenant ids.
   */
  tenantIdIn?: Array<string>;

  /**
   * If set to `true`, restricts the query to all tasks that are unassigned.
   */
  unassigned?: null | boolean;

  /**
   * Match all variable names in this query case-insensitively. If set
   * `variableName` and `variablename` are treated as equal.
   */
  variableNamesIgnoreCase?: null | boolean;

  /**
   * Match all variable values in this query case-insensitively. If set
   * `variableValue` and `variablevalue` are treated as equal.
   */
  variableValuesIgnoreCase?: null | boolean;

  /**
   * Only include tasks which have a candidate group. Value may only be `true`,
   * as `false` is the default behavior.
   */
  withCandidateGroups?: null | boolean;

  /**
   * Only include tasks which have a candidate user. Value may only be `true`,
   * as `false` is the default behavior.
   */
  withCandidateUsers?: null | boolean;

  /**
   * Only include tasks which have no candidate group. Value may only be `true`,
   * as `false` is the default behavior.
   */
  withoutCandidateGroups?: null | boolean;

  /**
   * Only include tasks which have no candidate users. Value may only be `true`,
   * as `false` is the default behavior.
   */
  withoutCandidateUsers?: null | boolean;

  /**
   * Only include tasks which belong to no tenant. Value may only be `true`, 
   * as `false` is the default behavior.
   */
  withoutTenantId?: null | boolean;
}
