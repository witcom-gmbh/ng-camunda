/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { CamundaEngineConfiguration } from '../camunda-engine-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CamundaCompleteTaskDto } from '../models/camunda-complete-task-dto';
import { CamundaCountResultDto } from '../models/camunda-count-result-dto';
import { CamundaFormDto } from '../models/camunda-form-dto';
import { CamundaTaskBpmnErrorDto } from '../models/camunda-task-bpmn-error-dto';
import { CamundaTaskDto } from '../models/camunda-task-dto';
import { CamundaTaskEscalationDto } from '../models/camunda-task-escalation-dto';
import { CamundaTaskQueryDto } from '../models/camunda-task-query-dto';
import { CamundaUserIdDto } from '../models/camunda-user-id-dto';
import { CamundaVariableValueDto } from '../models/camunda-variable-value-dto';

@Injectable({
  providedIn: 'root',
})
export class CamundaTaskService extends BaseService {
  constructor(
    config: CamundaEngineConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTasks
   */
  static readonly GetTasksPath = '/task';

  /**
   * Queries for tasks that fulfill a given filter. The size of the result set can be
   * retrieved by using the Get Task Count method.
   *
   * **Security Consideration:** There are several query parameters (such as
   * assigneeExpression) for specifying an EL expression. These are disabled by default to
   * prevent remote code execution. See the section on
   * [security considerations](https://docs.camunda.org/manual/7.14/user-guide/process-engine/securing-custom-code/)
   * for custom code in the user guide for details.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTasks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTasks$Response(params?: {

    /**
     * Restrict to tasks that belong to process instances with the given id.
     */
    processInstanceId?: string;

    /**
     * Restrict to tasks that belong to process instances with the given ids.
     */
    processInstanceIdIn?: string;

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
    processInstanceBusinessKeyIn?: string;

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
    processDefinitionKeyIn?: string;

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
     * Restrict to tasks that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Restrict to tasks that belong to case instances with the given id.
     */
    caseInstanceId?: string;

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
     * Only include tasks which belong to one of the passed and comma-separated activity 
     * instance ids.
     */
    activityInstanceIdIn?: string;

    /**
     * Only include tasks which belong to one of the passed and comma-separated 
     * tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include tasks which belong to no tenant. Value may only be &#x60;true&#x60;, 
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Restrict to tasks that the given user is assigned to.
     */
    assignee?: string;

    /**
     * Restrict to tasks that the user described by the given expression is assigned to. 
     * See the 
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions) 
     * for more information on available functions.
     */
    assigneeExpression?: string;

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
     * Only include tasks which are assigned to one of the passed and 
     * comma-separated user ids.
     */
    assigneeIn?: string;

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
     * Also include tasks that are assigned to users in candidate queries. Default is to only 
     * include tasks that are not assigned to any user if you query by candidate user or
     * group(s).
     */
    includeAssignedTasks?: boolean;

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
     * If set to &#x60;true&#x60;, restricts the query to all tasks that are assigned.
     */
    assigned?: boolean;

    /**
     * If set to &#x60;true&#x60;, restricts the query to all tasks that are unassigned.
     */
    unassigned?: boolean;

    /**
     * Restrict to tasks that have the given key.
     */
    taskDefinitionKey?: string;

    /**
     * Restrict to tasks that have one of the given keys. The keys need to be in a
     * comma-separated list.
     */
    taskDefinitionKeyIn?: string;

    /**
     * Restrict to tasks that have a key that has the parameter value as a substring.
     */
    taskDefinitionKeyLike?: string;

    /**
     * Restrict to tasks that have the given name.
     */
    name?: string;

    /**
     * Restrict to tasks that do not have the given name.
     */
    nameNotEqual?: string;

    /**
     * Restrict to tasks that have a name with the given parameter value as substring.
     */
    nameLike?: string;

    /**
     * Restrict to tasks that do not have a name with the given parameter
     * value as substring.
     */
    nameNotLike?: string;

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
     * Restrict to tasks that have the given priority.
     */
    priority?: number;

    /**
     * Restrict to tasks that have a lower or equal priority.
     */
    maxPriority?: number;

    /**
     * Restrict to tasks that have a higher or equal priority.
     */
    minPriority?: number;

    /**
     * Restrict to tasks that are due on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    dueDate?: string;

    /**
     * Restrict to tasks that are due on the date described by the given expression. See the
     * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueDateExpression?: string;

    /**
     * Restrict to tasks that are due after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.435+0200&#x60;.
     */
    dueAfter?: string;

    /**
     * Restrict to tasks that are due after the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueAfterExpression?: string;

    /**
     * Restrict to tasks that are due before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.243+0200&#x60;.
     */
    dueBefore?: string;

    /**
     * Restrict to tasks that are due before the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueBeforeExpression?: string;

    /**
     * Restrict to tasks that have a followUp date on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.342+0200&#x60;.
     */
    followUpDate?: string;

    /**
     * Restrict to tasks that have a followUp date on the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpDateExpression?: string;

    /**
     * Restrict to tasks that have a followUp date after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the
     * date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.542+0200&#x60;.
     */
    followUpAfter?: string;

    /**
     * Restrict to tasks that have a followUp date after the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpAfterExpression?: string;

    /**
     * Restrict to tasks that have a followUp date before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the
     * date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.234+0200&#x60;.
     */
    followUpBefore?: string;

    /**
     * Restrict to tasks that have a followUp date before the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpBeforeExpression?: string;

    /**
     * Restrict to tasks that have no followUp date or a followUp date before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.432+0200&#x60;. The
     * typical use case is to query all &#x60;active&#x60; tasks for a user for a given date.
     */
    followUpBeforeOrNotExistent?: string;

    /**
     * Restrict to tasks that have no followUp date or a followUp date before the date
     * described by the given expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpBeforeOrNotExistentExpression?: string;

    /**
     * Restrict to tasks that were created on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.324+0200&#x60;.
     */
    createdOn?: string;

    /**
     * Restrict to tasks that were created on the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdOnExpression?: string;

    /**
     * Restrict to tasks that were created after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.342+0200&#x60;.
     */
    createdAfter?: string;

    /**
     * Restrict to tasks that were created after the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdAfterExpression?: string;

    /**
     * Restrict to tasks that were created before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.332+0200&#x60;.
     */
    createdBefore?: string;

    /**
     * Restrict to tasks that were created before the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdBeforeExpression?: string;

    /**
     * Restrict to tasks that are in the given delegation state. Valid values are
     * &#x60;PENDING&#x60; and &#x60;RESOLVED&#x60;.
     */
    delegationState?: 'PENDING' | 'RESOLVED';

    /**
     * Restrict to tasks that are offered to any of the given candidate groups. Takes a
     * comma-separated list of group names, so for example &#x60;developers,support,sales&#x60;.
     */
    candidateGroups?: string;

    /**
     * Restrict to tasks that are offered to any of the candidate groups described by the
     * given expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to
     * &#x60;java.util.List&#x60; of Strings.
     */
    candidateGroupsExpression?: string;

    /**
     * Only include tasks which have a candidate group. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withCandidateGroups?: boolean;

    /**
     * Only include tasks which have no candidate group. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutCandidateGroups?: boolean;

    /**
     * Only include tasks which have a candidate user. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withCandidateUsers?: boolean;

    /**
     * Only include tasks which have no candidate users. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutCandidateUsers?: boolean;

    /**
     * Only include active tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60;
     * is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended tasks. Value may only be &#x60;true&#x60;, as
     * &#x60;false&#x60; is the default behavior.
     */
    suspended?: boolean;

    /**
     * Only include tasks that have variables with certain values. Variable filtering
     * expressions are comma-separated and are structured as follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    taskVariables?: string;

    /**
     * Only include tasks that belong to process instances that have variables with certain 
     * values. Variable filtering expressions are comma-separated and are structured as
     * follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    processVariables?: string;

    /**
     * Only include tasks that belong to case instances that have variables with certain
     * values. Variable filtering expressions are comma-separated and are structured as
     * follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    caseInstanceVariables?: string;

    /**
     * Match all variable names in this query case-insensitively. If set
     * &#x60;variableName&#x60; and &#x60;variablename&#x60; are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values in this query case-insensitively. If set
     * &#x60;variableValue&#x60; and &#x60;variablevalue&#x60; are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;

    /**
     * Restrict query to all tasks that are sub tasks of the given task. Takes a task id.
     */
    parentTaskId?: string;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'instanceId' | 'caseInstanceId' | 'dueDate' | 'executionId' | 'caseExecutionId' | 'assignee' | 'created' | 'description' | 'id' | 'name' | 'nameCaseInsensitive' | 'priority' | 'processVariable' | 'executionVariable' | 'taskVariable' | 'caseExecutionVariable' | 'caseInstanceVariable';

    /**
     * Sort the results in a given order. Values may be asc for ascending order or desc for descending order.
     * Must be used in conjunction with the sortBy parameter.
     */
    sortOrder?: 'asc' | 'desc';

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
  }): Observable<StrictHttpResponse<Array<CamundaTaskDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.GetTasksPath, 'get');
    if (params) {
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('processInstanceIdIn', params.processInstanceIdIn, {});
      rb.query('processInstanceBusinessKey', params.processInstanceBusinessKey, {});
      rb.query('processInstanceBusinessKeyExpression', params.processInstanceBusinessKeyExpression, {});
      rb.query('processInstanceBusinessKeyIn', params.processInstanceBusinessKeyIn, {});
      rb.query('processInstanceBusinessKeyLike', params.processInstanceBusinessKeyLike, {});
      rb.query('processInstanceBusinessKeyLikeExpression', params.processInstanceBusinessKeyLikeExpression, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('processDefinitionKey', params.processDefinitionKey, {});
      rb.query('processDefinitionKeyIn', params.processDefinitionKeyIn, {});
      rb.query('processDefinitionName', params.processDefinitionName, {});
      rb.query('processDefinitionNameLike', params.processDefinitionNameLike, {});
      rb.query('executionId', params.executionId, {});
      rb.query('caseInstanceId', params.caseInstanceId, {});
      rb.query('caseInstanceBusinessKey', params.caseInstanceBusinessKey, {});
      rb.query('caseInstanceBusinessKeyLike', params.caseInstanceBusinessKeyLike, {});
      rb.query('caseDefinitionId', params.caseDefinitionId, {});
      rb.query('caseDefinitionKey', params.caseDefinitionKey, {});
      rb.query('caseDefinitionName', params.caseDefinitionName, {});
      rb.query('caseDefinitionNameLike', params.caseDefinitionNameLike, {});
      rb.query('caseExecutionId', params.caseExecutionId, {});
      rb.query('activityInstanceIdIn', params.activityInstanceIdIn, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('assignee', params.assignee, {});
      rb.query('assigneeExpression', params.assigneeExpression, {});
      rb.query('assigneeLike', params.assigneeLike, {});
      rb.query('assigneeLikeExpression', params.assigneeLikeExpression, {});
      rb.query('assigneeIn', params.assigneeIn, {});
      rb.query('owner', params.owner, {});
      rb.query('ownerExpression', params.ownerExpression, {});
      rb.query('candidateGroup', params.candidateGroup, {});
      rb.query('candidateGroupExpression', params.candidateGroupExpression, {});
      rb.query('candidateUser', params.candidateUser, {});
      rb.query('candidateUserExpression', params.candidateUserExpression, {});
      rb.query('includeAssignedTasks', params.includeAssignedTasks, {});
      rb.query('involvedUser', params.involvedUser, {});
      rb.query('involvedUserExpression', params.involvedUserExpression, {});
      rb.query('assigned', params.assigned, {});
      rb.query('unassigned', params.unassigned, {});
      rb.query('taskDefinitionKey', params.taskDefinitionKey, {});
      rb.query('taskDefinitionKeyIn', params.taskDefinitionKeyIn, {});
      rb.query('taskDefinitionKeyLike', params.taskDefinitionKeyLike, {});
      rb.query('name', params.name, {});
      rb.query('nameNotEqual', params.nameNotEqual, {});
      rb.query('nameLike', params.nameLike, {});
      rb.query('nameNotLike', params.nameNotLike, {});
      rb.query('description', params.description, {});
      rb.query('descriptionLike', params.descriptionLike, {});
      rb.query('priority', params.priority, {});
      rb.query('maxPriority', params.maxPriority, {});
      rb.query('minPriority', params.minPriority, {});
      rb.query('dueDate', params.dueDate, {});
      rb.query('dueDateExpression', params.dueDateExpression, {});
      rb.query('dueAfter', params.dueAfter, {});
      rb.query('dueAfterExpression', params.dueAfterExpression, {});
      rb.query('dueBefore', params.dueBefore, {});
      rb.query('dueBeforeExpression', params.dueBeforeExpression, {});
      rb.query('followUpDate', params.followUpDate, {});
      rb.query('followUpDateExpression', params.followUpDateExpression, {});
      rb.query('followUpAfter', params.followUpAfter, {});
      rb.query('followUpAfterExpression', params.followUpAfterExpression, {});
      rb.query('followUpBefore', params.followUpBefore, {});
      rb.query('followUpBeforeExpression', params.followUpBeforeExpression, {});
      rb.query('followUpBeforeOrNotExistent', params.followUpBeforeOrNotExistent, {});
      rb.query('followUpBeforeOrNotExistentExpression', params.followUpBeforeOrNotExistentExpression, {});
      rb.query('createdOn', params.createdOn, {});
      rb.query('createdOnExpression', params.createdOnExpression, {});
      rb.query('createdAfter', params.createdAfter, {});
      rb.query('createdAfterExpression', params.createdAfterExpression, {});
      rb.query('createdBefore', params.createdBefore, {});
      rb.query('createdBeforeExpression', params.createdBeforeExpression, {});
      rb.query('delegationState', params.delegationState, {});
      rb.query('candidateGroups', params.candidateGroups, {});
      rb.query('candidateGroupsExpression', params.candidateGroupsExpression, {});
      rb.query('withCandidateGroups', params.withCandidateGroups, {});
      rb.query('withoutCandidateGroups', params.withoutCandidateGroups, {});
      rb.query('withCandidateUsers', params.withCandidateUsers, {});
      rb.query('withoutCandidateUsers', params.withoutCandidateUsers, {});
      rb.query('active', params.active, {});
      rb.query('suspended', params.suspended, {});
      rb.query('taskVariables', params.taskVariables, {});
      rb.query('processVariables', params.processVariables, {});
      rb.query('caseInstanceVariables', params.caseInstanceVariables, {});
      rb.query('variableNamesIgnoreCase', params.variableNamesIgnoreCase, {});
      rb.query('variableValuesIgnoreCase', params.variableValuesIgnoreCase, {});
      rb.query('parentTaskId', params.parentTaskId, {});
      rb.query('sortBy', params.sortBy, {});
      rb.query('sortOrder', params.sortOrder, {});
      rb.query('firstResult', params.firstResult, {});
      rb.query('maxResults', params.maxResults, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CamundaTaskDto>>;
      })
    );
  }

  /**
   * Queries for tasks that fulfill a given filter. The size of the result set can be
   * retrieved by using the Get Task Count method.
   *
   * **Security Consideration:** There are several query parameters (such as
   * assigneeExpression) for specifying an EL expression. These are disabled by default to
   * prevent remote code execution. See the section on
   * [security considerations](https://docs.camunda.org/manual/7.14/user-guide/process-engine/securing-custom-code/)
   * for custom code in the user guide for details.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTasks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTasks(params?: {

    /**
     * Restrict to tasks that belong to process instances with the given id.
     */
    processInstanceId?: string;

    /**
     * Restrict to tasks that belong to process instances with the given ids.
     */
    processInstanceIdIn?: string;

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
    processInstanceBusinessKeyIn?: string;

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
    processDefinitionKeyIn?: string;

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
     * Restrict to tasks that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Restrict to tasks that belong to case instances with the given id.
     */
    caseInstanceId?: string;

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
     * Only include tasks which belong to one of the passed and comma-separated activity 
     * instance ids.
     */
    activityInstanceIdIn?: string;

    /**
     * Only include tasks which belong to one of the passed and comma-separated 
     * tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include tasks which belong to no tenant. Value may only be &#x60;true&#x60;, 
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Restrict to tasks that the given user is assigned to.
     */
    assignee?: string;

    /**
     * Restrict to tasks that the user described by the given expression is assigned to. 
     * See the 
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions) 
     * for more information on available functions.
     */
    assigneeExpression?: string;

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
     * Only include tasks which are assigned to one of the passed and 
     * comma-separated user ids.
     */
    assigneeIn?: string;

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
     * Also include tasks that are assigned to users in candidate queries. Default is to only 
     * include tasks that are not assigned to any user if you query by candidate user or
     * group(s).
     */
    includeAssignedTasks?: boolean;

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
     * If set to &#x60;true&#x60;, restricts the query to all tasks that are assigned.
     */
    assigned?: boolean;

    /**
     * If set to &#x60;true&#x60;, restricts the query to all tasks that are unassigned.
     */
    unassigned?: boolean;

    /**
     * Restrict to tasks that have the given key.
     */
    taskDefinitionKey?: string;

    /**
     * Restrict to tasks that have one of the given keys. The keys need to be in a
     * comma-separated list.
     */
    taskDefinitionKeyIn?: string;

    /**
     * Restrict to tasks that have a key that has the parameter value as a substring.
     */
    taskDefinitionKeyLike?: string;

    /**
     * Restrict to tasks that have the given name.
     */
    name?: string;

    /**
     * Restrict to tasks that do not have the given name.
     */
    nameNotEqual?: string;

    /**
     * Restrict to tasks that have a name with the given parameter value as substring.
     */
    nameLike?: string;

    /**
     * Restrict to tasks that do not have a name with the given parameter
     * value as substring.
     */
    nameNotLike?: string;

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
     * Restrict to tasks that have the given priority.
     */
    priority?: number;

    /**
     * Restrict to tasks that have a lower or equal priority.
     */
    maxPriority?: number;

    /**
     * Restrict to tasks that have a higher or equal priority.
     */
    minPriority?: number;

    /**
     * Restrict to tasks that are due on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    dueDate?: string;

    /**
     * Restrict to tasks that are due on the date described by the given expression. See the
     * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueDateExpression?: string;

    /**
     * Restrict to tasks that are due after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.435+0200&#x60;.
     */
    dueAfter?: string;

    /**
     * Restrict to tasks that are due after the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueAfterExpression?: string;

    /**
     * Restrict to tasks that are due before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.243+0200&#x60;.
     */
    dueBefore?: string;

    /**
     * Restrict to tasks that are due before the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueBeforeExpression?: string;

    /**
     * Restrict to tasks that have a followUp date on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.342+0200&#x60;.
     */
    followUpDate?: string;

    /**
     * Restrict to tasks that have a followUp date on the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpDateExpression?: string;

    /**
     * Restrict to tasks that have a followUp date after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the
     * date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.542+0200&#x60;.
     */
    followUpAfter?: string;

    /**
     * Restrict to tasks that have a followUp date after the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpAfterExpression?: string;

    /**
     * Restrict to tasks that have a followUp date before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the
     * date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.234+0200&#x60;.
     */
    followUpBefore?: string;

    /**
     * Restrict to tasks that have a followUp date before the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpBeforeExpression?: string;

    /**
     * Restrict to tasks that have no followUp date or a followUp date before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.432+0200&#x60;. The
     * typical use case is to query all &#x60;active&#x60; tasks for a user for a given date.
     */
    followUpBeforeOrNotExistent?: string;

    /**
     * Restrict to tasks that have no followUp date or a followUp date before the date
     * described by the given expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpBeforeOrNotExistentExpression?: string;

    /**
     * Restrict to tasks that were created on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.324+0200&#x60;.
     */
    createdOn?: string;

    /**
     * Restrict to tasks that were created on the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdOnExpression?: string;

    /**
     * Restrict to tasks that were created after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.342+0200&#x60;.
     */
    createdAfter?: string;

    /**
     * Restrict to tasks that were created after the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdAfterExpression?: string;

    /**
     * Restrict to tasks that were created before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.332+0200&#x60;.
     */
    createdBefore?: string;

    /**
     * Restrict to tasks that were created before the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdBeforeExpression?: string;

    /**
     * Restrict to tasks that are in the given delegation state. Valid values are
     * &#x60;PENDING&#x60; and &#x60;RESOLVED&#x60;.
     */
    delegationState?: 'PENDING' | 'RESOLVED';

    /**
     * Restrict to tasks that are offered to any of the given candidate groups. Takes a
     * comma-separated list of group names, so for example &#x60;developers,support,sales&#x60;.
     */
    candidateGroups?: string;

    /**
     * Restrict to tasks that are offered to any of the candidate groups described by the
     * given expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to
     * &#x60;java.util.List&#x60; of Strings.
     */
    candidateGroupsExpression?: string;

    /**
     * Only include tasks which have a candidate group. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withCandidateGroups?: boolean;

    /**
     * Only include tasks which have no candidate group. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutCandidateGroups?: boolean;

    /**
     * Only include tasks which have a candidate user. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withCandidateUsers?: boolean;

    /**
     * Only include tasks which have no candidate users. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutCandidateUsers?: boolean;

    /**
     * Only include active tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60;
     * is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended tasks. Value may only be &#x60;true&#x60;, as
     * &#x60;false&#x60; is the default behavior.
     */
    suspended?: boolean;

    /**
     * Only include tasks that have variables with certain values. Variable filtering
     * expressions are comma-separated and are structured as follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    taskVariables?: string;

    /**
     * Only include tasks that belong to process instances that have variables with certain 
     * values. Variable filtering expressions are comma-separated and are structured as
     * follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    processVariables?: string;

    /**
     * Only include tasks that belong to case instances that have variables with certain
     * values. Variable filtering expressions are comma-separated and are structured as
     * follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    caseInstanceVariables?: string;

    /**
     * Match all variable names in this query case-insensitively. If set
     * &#x60;variableName&#x60; and &#x60;variablename&#x60; are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values in this query case-insensitively. If set
     * &#x60;variableValue&#x60; and &#x60;variablevalue&#x60; are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;

    /**
     * Restrict query to all tasks that are sub tasks of the given task. Takes a task id.
     */
    parentTaskId?: string;

    /**
     * Sort the results lexicographically by a given criterion.
     * Must be used in conjunction with the sortOrder parameter.
     */
    sortBy?: 'instanceId' | 'caseInstanceId' | 'dueDate' | 'executionId' | 'caseExecutionId' | 'assignee' | 'created' | 'description' | 'id' | 'name' | 'nameCaseInsensitive' | 'priority' | 'processVariable' | 'executionVariable' | 'taskVariable' | 'caseExecutionVariable' | 'caseInstanceVariable';

    /**
     * Sort the results in a given order. Values may be asc for ascending order or desc for descending order.
     * Must be used in conjunction with the sortBy parameter.
     */
    sortOrder?: 'asc' | 'desc';

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
  }): Observable<Array<CamundaTaskDto>> {

    return this.getTasks$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CamundaTaskDto>>) => r.body as Array<CamundaTaskDto>)
    );
  }

  /**
   * Path part for operation queryTasks
   */
  static readonly QueryTasksPath = '/task';

  /**
   * Queries for tasks that fulfill a given filter. This method is slightly more powerful
   * than the [Get Tasks](https://docs.camunda.org/manual/7.14/reference/rest/task/get-query/) method because it
   * allows filtering by multiple process or task variables of types `String`, `Number`
   * or `Boolean`. The size of the result set can be retrieved by using the
   * [Get Task Count (POST)](https://docs.camunda.org/manual/7.14/reference/rest/task/post-query-count/) method.
   *
   * **Security Consideration**:
   * There are several parameters (such as `assigneeExpression`) for specifying an EL
   * expression. These are disabled by default to prevent remote code execution. See the
   * section on
   * [security considerations for custom code](https://docs.camunda.org/manual/7.14/user-guide/process-engine/securing-custom-code/)
   * in the user guide for details.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `queryTasks()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryTasks$Response(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: CamundaTaskQueryDto
  }): Observable<StrictHttpResponse<Array<CamundaTaskDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.QueryTasksPath, 'post');
    if (params) {
      rb.query('firstResult', params.firstResult, {});
      rb.query('maxResults', params.maxResults, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CamundaTaskDto>>;
      })
    );
  }

  /**
   * Queries for tasks that fulfill a given filter. This method is slightly more powerful
   * than the [Get Tasks](https://docs.camunda.org/manual/7.14/reference/rest/task/get-query/) method because it
   * allows filtering by multiple process or task variables of types `String`, `Number`
   * or `Boolean`. The size of the result set can be retrieved by using the
   * [Get Task Count (POST)](https://docs.camunda.org/manual/7.14/reference/rest/task/post-query-count/) method.
   *
   * **Security Consideration**:
   * There are several parameters (such as `assigneeExpression`) for specifying an EL
   * expression. These are disabled by default to prevent remote code execution. See the
   * section on
   * [security considerations for custom code](https://docs.camunda.org/manual/7.14/user-guide/process-engine/securing-custom-code/)
   * in the user guide for details.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `queryTasks$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryTasks(params?: {

    /**
     * Pagination of results. Specifies the index of the first result to return.
     */
    firstResult?: number;

    /**
     * Pagination of results. Specifies the maximum number of results to return.
     * Will return less results if there are no more results left.
     */
    maxResults?: number;
    body?: CamundaTaskQueryDto
  }): Observable<Array<CamundaTaskDto>> {

    return this.queryTasks$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CamundaTaskDto>>) => r.body as Array<CamundaTaskDto>)
    );
  }

  /**
   * Path part for operation getTasksCount
   */
  static readonly GetTasksCountPath = '/task/count';

  /**
   * Retrieves the number of tasks that fulfill a provided filter. Corresponds to the size
   * of the result set when using the [Get Tasks](https://docs.camunda.org/manual/7.14/reference/rest/task/) method.
   *
   * **Security Consideration:** There are several query parameters (such as
   * assigneeExpression) for specifying an EL expression. These are disabled by default to
   * prevent remote code execution. See the section on
   * [security considerations](https://docs.camunda.org/manual/7.14/user-guide/process-engine/securing-custom-code/)
   * for custom code in the user guide for details.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTasksCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTasksCount$Response(params?: {

    /**
     * Restrict to tasks that belong to process instances with the given id.
     */
    processInstanceId?: string;

    /**
     * Restrict to tasks that belong to process instances with the given ids.
     */
    processInstanceIdIn?: string;

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
    processInstanceBusinessKeyIn?: string;

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
    processDefinitionKeyIn?: string;

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
     * Restrict to tasks that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Restrict to tasks that belong to case instances with the given id.
     */
    caseInstanceId?: string;

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
     * Only include tasks which belong to one of the passed and comma-separated activity 
     * instance ids.
     */
    activityInstanceIdIn?: string;

    /**
     * Only include tasks which belong to one of the passed and comma-separated 
     * tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include tasks which belong to no tenant. Value may only be &#x60;true&#x60;, 
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Restrict to tasks that the given user is assigned to.
     */
    assignee?: string;

    /**
     * Restrict to tasks that the user described by the given expression is assigned to. 
     * See the 
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions) 
     * for more information on available functions.
     */
    assigneeExpression?: string;

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
     * Only include tasks which are assigned to one of the passed and 
     * comma-separated user ids.
     */
    assigneeIn?: string;

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
     * Also include tasks that are assigned to users in candidate queries. Default is to only 
     * include tasks that are not assigned to any user if you query by candidate user or
     * group(s).
     */
    includeAssignedTasks?: boolean;

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
     * If set to &#x60;true&#x60;, restricts the query to all tasks that are assigned.
     */
    assigned?: boolean;

    /**
     * If set to &#x60;true&#x60;, restricts the query to all tasks that are unassigned.
     */
    unassigned?: boolean;

    /**
     * Restrict to tasks that have the given key.
     */
    taskDefinitionKey?: string;

    /**
     * Restrict to tasks that have one of the given keys. The keys need to be in a
     * comma-separated list.
     */
    taskDefinitionKeyIn?: string;

    /**
     * Restrict to tasks that have a key that has the parameter value as a substring.
     */
    taskDefinitionKeyLike?: string;

    /**
     * Restrict to tasks that have the given name.
     */
    name?: string;

    /**
     * Restrict to tasks that do not have the given name.
     */
    nameNotEqual?: string;

    /**
     * Restrict to tasks that have a name with the given parameter value as substring.
     */
    nameLike?: string;

    /**
     * Restrict to tasks that do not have a name with the given parameter
     * value as substring.
     */
    nameNotLike?: string;

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
     * Restrict to tasks that have the given priority.
     */
    priority?: number;

    /**
     * Restrict to tasks that have a lower or equal priority.
     */
    maxPriority?: number;

    /**
     * Restrict to tasks that have a higher or equal priority.
     */
    minPriority?: number;

    /**
     * Restrict to tasks that are due on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    dueDate?: string;

    /**
     * Restrict to tasks that are due on the date described by the given expression. See the
     * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueDateExpression?: string;

    /**
     * Restrict to tasks that are due after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.435+0200&#x60;.
     */
    dueAfter?: string;

    /**
     * Restrict to tasks that are due after the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueAfterExpression?: string;

    /**
     * Restrict to tasks that are due before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.243+0200&#x60;.
     */
    dueBefore?: string;

    /**
     * Restrict to tasks that are due before the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueBeforeExpression?: string;

    /**
     * Restrict to tasks that have a followUp date on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.342+0200&#x60;.
     */
    followUpDate?: string;

    /**
     * Restrict to tasks that have a followUp date on the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpDateExpression?: string;

    /**
     * Restrict to tasks that have a followUp date after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the
     * date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.542+0200&#x60;.
     */
    followUpAfter?: string;

    /**
     * Restrict to tasks that have a followUp date after the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpAfterExpression?: string;

    /**
     * Restrict to tasks that have a followUp date before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the
     * date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.234+0200&#x60;.
     */
    followUpBefore?: string;

    /**
     * Restrict to tasks that have a followUp date before the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpBeforeExpression?: string;

    /**
     * Restrict to tasks that have no followUp date or a followUp date before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.432+0200&#x60;. The
     * typical use case is to query all &#x60;active&#x60; tasks for a user for a given date.
     */
    followUpBeforeOrNotExistent?: string;

    /**
     * Restrict to tasks that have no followUp date or a followUp date before the date
     * described by the given expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpBeforeOrNotExistentExpression?: string;

    /**
     * Restrict to tasks that were created on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.324+0200&#x60;.
     */
    createdOn?: string;

    /**
     * Restrict to tasks that were created on the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdOnExpression?: string;

    /**
     * Restrict to tasks that were created after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.342+0200&#x60;.
     */
    createdAfter?: string;

    /**
     * Restrict to tasks that were created after the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdAfterExpression?: string;

    /**
     * Restrict to tasks that were created before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.332+0200&#x60;.
     */
    createdBefore?: string;

    /**
     * Restrict to tasks that were created before the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdBeforeExpression?: string;

    /**
     * Restrict to tasks that are in the given delegation state. Valid values are
     * &#x60;PENDING&#x60; and &#x60;RESOLVED&#x60;.
     */
    delegationState?: 'PENDING' | 'RESOLVED';

    /**
     * Restrict to tasks that are offered to any of the given candidate groups. Takes a
     * comma-separated list of group names, so for example &#x60;developers,support,sales&#x60;.
     */
    candidateGroups?: string;

    /**
     * Restrict to tasks that are offered to any of the candidate groups described by the
     * given expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to
     * &#x60;java.util.List&#x60; of Strings.
     */
    candidateGroupsExpression?: string;

    /**
     * Only include tasks which have a candidate group. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withCandidateGroups?: boolean;

    /**
     * Only include tasks which have no candidate group. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutCandidateGroups?: boolean;

    /**
     * Only include tasks which have a candidate user. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withCandidateUsers?: boolean;

    /**
     * Only include tasks which have no candidate users. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutCandidateUsers?: boolean;

    /**
     * Only include active tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60;
     * is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended tasks. Value may only be &#x60;true&#x60;, as
     * &#x60;false&#x60; is the default behavior.
     */
    suspended?: boolean;

    /**
     * Only include tasks that have variables with certain values. Variable filtering
     * expressions are comma-separated and are structured as follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    taskVariables?: string;

    /**
     * Only include tasks that belong to process instances that have variables with certain 
     * values. Variable filtering expressions are comma-separated and are structured as
     * follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    processVariables?: string;

    /**
     * Only include tasks that belong to case instances that have variables with certain
     * values. Variable filtering expressions are comma-separated and are structured as
     * follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    caseInstanceVariables?: string;

    /**
     * Match all variable names in this query case-insensitively. If set
     * &#x60;variableName&#x60; and &#x60;variablename&#x60; are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values in this query case-insensitively. If set
     * &#x60;variableValue&#x60; and &#x60;variablevalue&#x60; are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;

    /**
     * Restrict query to all tasks that are sub tasks of the given task. Takes a task id.
     */
    parentTaskId?: string;
  }): Observable<StrictHttpResponse<CamundaCountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.GetTasksCountPath, 'get');
    if (params) {
      rb.query('processInstanceId', params.processInstanceId, {});
      rb.query('processInstanceIdIn', params.processInstanceIdIn, {});
      rb.query('processInstanceBusinessKey', params.processInstanceBusinessKey, {});
      rb.query('processInstanceBusinessKeyExpression', params.processInstanceBusinessKeyExpression, {});
      rb.query('processInstanceBusinessKeyIn', params.processInstanceBusinessKeyIn, {});
      rb.query('processInstanceBusinessKeyLike', params.processInstanceBusinessKeyLike, {});
      rb.query('processInstanceBusinessKeyLikeExpression', params.processInstanceBusinessKeyLikeExpression, {});
      rb.query('processDefinitionId', params.processDefinitionId, {});
      rb.query('processDefinitionKey', params.processDefinitionKey, {});
      rb.query('processDefinitionKeyIn', params.processDefinitionKeyIn, {});
      rb.query('processDefinitionName', params.processDefinitionName, {});
      rb.query('processDefinitionNameLike', params.processDefinitionNameLike, {});
      rb.query('executionId', params.executionId, {});
      rb.query('caseInstanceId', params.caseInstanceId, {});
      rb.query('caseInstanceBusinessKey', params.caseInstanceBusinessKey, {});
      rb.query('caseInstanceBusinessKeyLike', params.caseInstanceBusinessKeyLike, {});
      rb.query('caseDefinitionId', params.caseDefinitionId, {});
      rb.query('caseDefinitionKey', params.caseDefinitionKey, {});
      rb.query('caseDefinitionName', params.caseDefinitionName, {});
      rb.query('caseDefinitionNameLike', params.caseDefinitionNameLike, {});
      rb.query('caseExecutionId', params.caseExecutionId, {});
      rb.query('activityInstanceIdIn', params.activityInstanceIdIn, {});
      rb.query('tenantIdIn', params.tenantIdIn, {});
      rb.query('withoutTenantId', params.withoutTenantId, {});
      rb.query('assignee', params.assignee, {});
      rb.query('assigneeExpression', params.assigneeExpression, {});
      rb.query('assigneeLike', params.assigneeLike, {});
      rb.query('assigneeLikeExpression', params.assigneeLikeExpression, {});
      rb.query('assigneeIn', params.assigneeIn, {});
      rb.query('owner', params.owner, {});
      rb.query('ownerExpression', params.ownerExpression, {});
      rb.query('candidateGroup', params.candidateGroup, {});
      rb.query('candidateGroupExpression', params.candidateGroupExpression, {});
      rb.query('candidateUser', params.candidateUser, {});
      rb.query('candidateUserExpression', params.candidateUserExpression, {});
      rb.query('includeAssignedTasks', params.includeAssignedTasks, {});
      rb.query('involvedUser', params.involvedUser, {});
      rb.query('involvedUserExpression', params.involvedUserExpression, {});
      rb.query('assigned', params.assigned, {});
      rb.query('unassigned', params.unassigned, {});
      rb.query('taskDefinitionKey', params.taskDefinitionKey, {});
      rb.query('taskDefinitionKeyIn', params.taskDefinitionKeyIn, {});
      rb.query('taskDefinitionKeyLike', params.taskDefinitionKeyLike, {});
      rb.query('name', params.name, {});
      rb.query('nameNotEqual', params.nameNotEqual, {});
      rb.query('nameLike', params.nameLike, {});
      rb.query('nameNotLike', params.nameNotLike, {});
      rb.query('description', params.description, {});
      rb.query('descriptionLike', params.descriptionLike, {});
      rb.query('priority', params.priority, {});
      rb.query('maxPriority', params.maxPriority, {});
      rb.query('minPriority', params.minPriority, {});
      rb.query('dueDate', params.dueDate, {});
      rb.query('dueDateExpression', params.dueDateExpression, {});
      rb.query('dueAfter', params.dueAfter, {});
      rb.query('dueAfterExpression', params.dueAfterExpression, {});
      rb.query('dueBefore', params.dueBefore, {});
      rb.query('dueBeforeExpression', params.dueBeforeExpression, {});
      rb.query('followUpDate', params.followUpDate, {});
      rb.query('followUpDateExpression', params.followUpDateExpression, {});
      rb.query('followUpAfter', params.followUpAfter, {});
      rb.query('followUpAfterExpression', params.followUpAfterExpression, {});
      rb.query('followUpBefore', params.followUpBefore, {});
      rb.query('followUpBeforeExpression', params.followUpBeforeExpression, {});
      rb.query('followUpBeforeOrNotExistent', params.followUpBeforeOrNotExistent, {});
      rb.query('followUpBeforeOrNotExistentExpression', params.followUpBeforeOrNotExistentExpression, {});
      rb.query('createdOn', params.createdOn, {});
      rb.query('createdOnExpression', params.createdOnExpression, {});
      rb.query('createdAfter', params.createdAfter, {});
      rb.query('createdAfterExpression', params.createdAfterExpression, {});
      rb.query('createdBefore', params.createdBefore, {});
      rb.query('createdBeforeExpression', params.createdBeforeExpression, {});
      rb.query('delegationState', params.delegationState, {});
      rb.query('candidateGroups', params.candidateGroups, {});
      rb.query('candidateGroupsExpression', params.candidateGroupsExpression, {});
      rb.query('withCandidateGroups', params.withCandidateGroups, {});
      rb.query('withoutCandidateGroups', params.withoutCandidateGroups, {});
      rb.query('withCandidateUsers', params.withCandidateUsers, {});
      rb.query('withoutCandidateUsers', params.withoutCandidateUsers, {});
      rb.query('active', params.active, {});
      rb.query('suspended', params.suspended, {});
      rb.query('taskVariables', params.taskVariables, {});
      rb.query('processVariables', params.processVariables, {});
      rb.query('caseInstanceVariables', params.caseInstanceVariables, {});
      rb.query('variableNamesIgnoreCase', params.variableNamesIgnoreCase, {});
      rb.query('variableValuesIgnoreCase', params.variableValuesIgnoreCase, {});
      rb.query('parentTaskId', params.parentTaskId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaCountResultDto>;
      })
    );
  }

  /**
   * Retrieves the number of tasks that fulfill a provided filter. Corresponds to the size
   * of the result set when using the [Get Tasks](https://docs.camunda.org/manual/7.14/reference/rest/task/) method.
   *
   * **Security Consideration:** There are several query parameters (such as
   * assigneeExpression) for specifying an EL expression. These are disabled by default to
   * prevent remote code execution. See the section on
   * [security considerations](https://docs.camunda.org/manual/7.14/user-guide/process-engine/securing-custom-code/)
   * for custom code in the user guide for details.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTasksCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTasksCount(params?: {

    /**
     * Restrict to tasks that belong to process instances with the given id.
     */
    processInstanceId?: string;

    /**
     * Restrict to tasks that belong to process instances with the given ids.
     */
    processInstanceIdIn?: string;

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
    processInstanceBusinessKeyIn?: string;

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
    processDefinitionKeyIn?: string;

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
     * Restrict to tasks that belong to an execution with the given id.
     */
    executionId?: string;

    /**
     * Restrict to tasks that belong to case instances with the given id.
     */
    caseInstanceId?: string;

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
     * Only include tasks which belong to one of the passed and comma-separated activity 
     * instance ids.
     */
    activityInstanceIdIn?: string;

    /**
     * Only include tasks which belong to one of the passed and comma-separated 
     * tenant ids.
     */
    tenantIdIn?: string;

    /**
     * Only include tasks which belong to no tenant. Value may only be &#x60;true&#x60;, 
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutTenantId?: boolean;

    /**
     * Restrict to tasks that the given user is assigned to.
     */
    assignee?: string;

    /**
     * Restrict to tasks that the user described by the given expression is assigned to. 
     * See the 
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions) 
     * for more information on available functions.
     */
    assigneeExpression?: string;

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
     * Only include tasks which are assigned to one of the passed and 
     * comma-separated user ids.
     */
    assigneeIn?: string;

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
     * Also include tasks that are assigned to users in candidate queries. Default is to only 
     * include tasks that are not assigned to any user if you query by candidate user or
     * group(s).
     */
    includeAssignedTasks?: boolean;

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
     * If set to &#x60;true&#x60;, restricts the query to all tasks that are assigned.
     */
    assigned?: boolean;

    /**
     * If set to &#x60;true&#x60;, restricts the query to all tasks that are unassigned.
     */
    unassigned?: boolean;

    /**
     * Restrict to tasks that have the given key.
     */
    taskDefinitionKey?: string;

    /**
     * Restrict to tasks that have one of the given keys. The keys need to be in a
     * comma-separated list.
     */
    taskDefinitionKeyIn?: string;

    /**
     * Restrict to tasks that have a key that has the parameter value as a substring.
     */
    taskDefinitionKeyLike?: string;

    /**
     * Restrict to tasks that have the given name.
     */
    name?: string;

    /**
     * Restrict to tasks that do not have the given name.
     */
    nameNotEqual?: string;

    /**
     * Restrict to tasks that have a name with the given parameter value as substring.
     */
    nameLike?: string;

    /**
     * Restrict to tasks that do not have a name with the given parameter
     * value as substring.
     */
    nameNotLike?: string;

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
     * Restrict to tasks that have the given priority.
     */
    priority?: number;

    /**
     * Restrict to tasks that have a lower or equal priority.
     */
    maxPriority?: number;

    /**
     * Restrict to tasks that have a higher or equal priority.
     */
    minPriority?: number;

    /**
     * Restrict to tasks that are due on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.546+0200&#x60;.
     */
    dueDate?: string;

    /**
     * Restrict to tasks that are due on the date described by the given expression. See the
     * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueDateExpression?: string;

    /**
     * Restrict to tasks that are due after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.435+0200&#x60;.
     */
    dueAfter?: string;

    /**
     * Restrict to tasks that are due after the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueAfterExpression?: string;

    /**
     * Restrict to tasks that are due before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.243+0200&#x60;.
     */
    dueBefore?: string;

    /**
     * Restrict to tasks that are due before the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    dueBeforeExpression?: string;

    /**
     * Restrict to tasks that have a followUp date on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date
     * must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.342+0200&#x60;.
     */
    followUpDate?: string;

    /**
     * Restrict to tasks that have a followUp date on the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpDateExpression?: string;

    /**
     * Restrict to tasks that have a followUp date after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the
     * date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.542+0200&#x60;.
     */
    followUpAfter?: string;

    /**
     * Restrict to tasks that have a followUp date after the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpAfterExpression?: string;

    /**
     * Restrict to tasks that have a followUp date before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the
     * date must have the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g.,
     * &#x60;2013-01-23T14:42:45.234+0200&#x60;.
     */
    followUpBefore?: string;

    /**
     * Restrict to tasks that have a followUp date before the date described by the given
     * expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpBeforeExpression?: string;

    /**
     * Restrict to tasks that have no followUp date or a followUp date before the given date.
     * By [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.432+0200&#x60;. The
     * typical use case is to query all &#x60;active&#x60; tasks for a user for a given date.
     */
    followUpBeforeOrNotExistent?: string;

    /**
     * Restrict to tasks that have no followUp date or a followUp date before the date
     * described by the given expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    followUpBeforeOrNotExistentExpression?: string;

    /**
     * Restrict to tasks that were created on the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have
     * the format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.324+0200&#x60;.
     */
    createdOn?: string;

    /**
     * Restrict to tasks that were created on the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdOnExpression?: string;

    /**
     * Restrict to tasks that were created after the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.342+0200&#x60;.
     */
    createdAfter?: string;

    /**
     * Restrict to tasks that were created after the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdAfterExpression?: string;

    /**
     * Restrict to tasks that were created before the given date. By
     * [default](https://docs.camunda.org/manual/7.14/reference/rest/overview/date-format/), the date must have the
     * format &#x60;yyyy-MM-dd&#x27;T&#x27;HH:mm:ss.SSSZ&#x60;, e.g., &#x60;2013-01-23T14:42:45.332+0200&#x60;.
     */
    createdBefore?: string;

    /**
     * Restrict to tasks that were created before the date described by the given expression.
     * See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to a
     * &#x60;java.util.Date&#x60; or &#x60;org.joda.time.DateTime&#x60; object.
     */
    createdBeforeExpression?: string;

    /**
     * Restrict to tasks that are in the given delegation state. Valid values are
     * &#x60;PENDING&#x60; and &#x60;RESOLVED&#x60;.
     */
    delegationState?: 'PENDING' | 'RESOLVED';

    /**
     * Restrict to tasks that are offered to any of the given candidate groups. Takes a
     * comma-separated list of group names, so for example &#x60;developers,support,sales&#x60;.
     */
    candidateGroups?: string;

    /**
     * Restrict to tasks that are offered to any of the candidate groups described by the
     * given expression. See the
     * [user guide](https://docs.camunda.org/manual/7.14/user-guide/process-engine/expression-language/#internal-context-functions)
     * for more information on available functions. The expression must evaluate to
     * &#x60;java.util.List&#x60; of Strings.
     */
    candidateGroupsExpression?: string;

    /**
     * Only include tasks which have a candidate group. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withCandidateGroups?: boolean;

    /**
     * Only include tasks which have no candidate group. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutCandidateGroups?: boolean;

    /**
     * Only include tasks which have a candidate user. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withCandidateUsers?: boolean;

    /**
     * Only include tasks which have no candidate users. Value may only be &#x60;true&#x60;,
     * as &#x60;false&#x60; is the default behavior.
     */
    withoutCandidateUsers?: boolean;

    /**
     * Only include active tasks. Value may only be &#x60;true&#x60;, as &#x60;false&#x60;
     * is the default behavior.
     */
    active?: boolean;

    /**
     * Only include suspended tasks. Value may only be &#x60;true&#x60;, as
     * &#x60;false&#x60; is the default behavior.
     */
    suspended?: boolean;

    /**
     * Only include tasks that have variables with certain values. Variable filtering
     * expressions are comma-separated and are structured as follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    taskVariables?: string;

    /**
     * Only include tasks that belong to process instances that have variables with certain 
     * values. Variable filtering expressions are comma-separated and are structured as
     * follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    processVariables?: string;

    /**
     * Only include tasks that belong to case instances that have variables with certain
     * values. Variable filtering expressions are comma-separated and are structured as
     * follows:
     *
     * A valid parameter value has the form &#x60;key_operator_value&#x60;. &#x60;key&#x60; is the variable name,
     * &#x60;operator&#x60; is the comparison operator to be used and &#x60;value&#x60; the variable value.
     *
     * **Note**: Values are always treated as String objects on server side.
     *
     * Valid &#x60;operator&#x60; values are:
     * &#x60;eq&#x60; - equal to;
     * &#x60;neq&#x60; - not equal to;
     * &#x60;gt&#x60; - greater than;
     * &#x60;gteq&#x60; - greater than or equal to;
     * &#x60;lt&#x60; - lower than;
     * &#x60;lteq&#x60; - lower than or equal to;
     * &#x60;like&#x60;.
     * &#x60;key&#x60; and &#x60;value&#x60; may not contain underscore or comma characters.
     */
    caseInstanceVariables?: string;

    /**
     * Match all variable names in this query case-insensitively. If set
     * &#x60;variableName&#x60; and &#x60;variablename&#x60; are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;

    /**
     * Match all variable values in this query case-insensitively. If set
     * &#x60;variableValue&#x60; and &#x60;variablevalue&#x60; are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;

    /**
     * Restrict query to all tasks that are sub tasks of the given task. Takes a task id.
     */
    parentTaskId?: string;
  }): Observable<CamundaCountResultDto> {

    return this.getTasksCount$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaCountResultDto>) => r.body as CamundaCountResultDto)
    );
  }

  /**
   * Path part for operation queryTasksCount
   */
  static readonly QueryTasksCountPath = '/task/count';

  /**
   * Retrieves the number of tasks that fulfill the given filter. Corresponds to the size
   * of the result set of the [Get Tasks (POST)](https://docs.camunda.org/manual/7.14/reference/rest/task/post-query/)
   * method and takes the same parameters.
   *
   * **Security Consideration**:
   * There are several parameters (such as `assigneeExpression`) for specifying an EL
   * expression. These are disabled by default to prevent remote code execution. See the
   * section on
   * [security considerations for custom code](https://docs.camunda.org/manual/7.14/user-guide/process-engine/securing-custom-code/)
   * in the user guide for details.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `queryTasksCount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryTasksCount$Response(params?: {
    body?: CamundaTaskQueryDto
  }): Observable<StrictHttpResponse<CamundaCountResultDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.QueryTasksCountPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaCountResultDto>;
      })
    );
  }

  /**
   * Retrieves the number of tasks that fulfill the given filter. Corresponds to the size
   * of the result set of the [Get Tasks (POST)](https://docs.camunda.org/manual/7.14/reference/rest/task/post-query/)
   * method and takes the same parameters.
   *
   * **Security Consideration**:
   * There are several parameters (such as `assigneeExpression`) for specifying an EL
   * expression. These are disabled by default to prevent remote code execution. See the
   * section on
   * [security considerations for custom code](https://docs.camunda.org/manual/7.14/user-guide/process-engine/securing-custom-code/)
   * in the user guide for details.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `queryTasksCount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  queryTasksCount(params?: {
    body?: CamundaTaskQueryDto
  }): Observable<CamundaCountResultDto> {

    return this.queryTasksCount$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaCountResultDto>) => r.body as CamundaCountResultDto)
    );
  }

  /**
   * Path part for operation createTask
   */
  static readonly CreateTaskPath = '/task/create';

  /**
   * Creates a new task.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTask()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTask$Response(params?: {
    body?: CamundaTaskDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.CreateTaskPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Creates a new task.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createTask$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTask(params?: {
    body?: CamundaTaskDto
  }): Observable<void> {

    return this.createTask$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getTask
   */
  static readonly GetTaskPath = '/task/{id}';

  /**
   * Retrieves a task by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTask$Response(params: {

    /**
     * The id of the task to be retrieved.
     */
    id: string;
  }): Observable<StrictHttpResponse<CamundaTaskDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.GetTaskPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaTaskDto>;
      })
    );
  }

  /**
   * Retrieves a task by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTask(params: {

    /**
     * The id of the task to be retrieved.
     */
    id: string;
  }): Observable<CamundaTaskDto> {

    return this.getTask$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaTaskDto>) => r.body as CamundaTaskDto)
    );
  }

  /**
   * Path part for operation updateTask
   */
  static readonly UpdateTaskPath = '/task/{id}';

  /**
   * Updates a task.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTask()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTask$Response(params: {

    /**
     * The id of the task to be updated.
     */
    id: string;
    body?: CamundaTaskDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.UpdateTaskPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Updates a task.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateTask$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTask(params: {

    /**
     * The id of the task to be updated.
     */
    id: string;
    body?: CamundaTaskDto
  }): Observable<void> {

    return this.updateTask$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteTask
   */
  static readonly DeleteTaskPath = '/task/{id}';

  /**
   * Removes a task by id.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTask()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTask$Response(params: {

    /**
     * The id of the task to be removed.
     */
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.DeleteTaskPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Removes a task by id.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteTask$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTask(params: {

    /**
     * The id of the task to be removed.
     */
    id: string;
  }): Observable<void> {

    return this.deleteTask$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation setAssignee
   */
  static readonly SetAssigneePath = '/task/{id}/assignee';

  /**
   * Changes the assignee of a task to a specific user.
   *
   * **Note:** The difference with the [Claim Task](https://docs.camunda.org/manual/7.14/reference/rest/task/post-claim/)
   * method is that this method does not check if the task already has a user
   * assigned to it.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setAssignee()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setAssignee$Response(params: {

    /**
     * The id of the task to set the assignee for.
     */
    id: string;

    /**
     * Provide the id of the user that will be the assignee of the task.
     */
    body?: CamundaUserIdDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.SetAssigneePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Changes the assignee of a task to a specific user.
   *
   * **Note:** The difference with the [Claim Task](https://docs.camunda.org/manual/7.14/reference/rest/task/post-claim/)
   * method is that this method does not check if the task already has a user
   * assigned to it.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setAssignee$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setAssignee(params: {

    /**
     * The id of the task to set the assignee for.
     */
    id: string;

    /**
     * Provide the id of the user that will be the assignee of the task.
     */
    body?: CamundaUserIdDto
  }): Observable<void> {

    return this.setAssignee$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation handleBpmnError
   */
  static readonly HandleBpmnErrorPath = '/task/{id}/bpmnError';

  /**
   * Reports a business error in the context of a running task by id. The error code must
   * be specified to identify the BPMN error handler. See the documentation for
   * [Reporting Bpmn Error](https://docs.camunda.org/manual/7.14/reference/bpmn20/tasks/user-task/#reporting-bpmn-error)
   * in User Tasks.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `handleBpmnError()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  handleBpmnError$Response(params: {

    /**
     * The id of the task a BPMN error is reported for.
     */
    id: string;
    body?: CamundaTaskBpmnErrorDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.HandleBpmnErrorPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Reports a business error in the context of a running task by id. The error code must
   * be specified to identify the BPMN error handler. See the documentation for
   * [Reporting Bpmn Error](https://docs.camunda.org/manual/7.14/reference/bpmn20/tasks/user-task/#reporting-bpmn-error)
   * in User Tasks.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `handleBpmnError$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  handleBpmnError(params: {

    /**
     * The id of the task a BPMN error is reported for.
     */
    id: string;
    body?: CamundaTaskBpmnErrorDto
  }): Observable<void> {

    return this.handleBpmnError$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation handleEscalation
   */
  static readonly HandleEscalationPath = '/task/{id}/bpmnEscalation';

  /**
   * Reports an escalation in the context of a running task by id. The escalation code must
   * be specified to identify the escalation handler. See the documentation for
   * [Reporting Bpmn Escalation](https://docs.camunda.org/manual/7.14/reference/bpmn20/tasks/user-task/#reporting-bpmn-escalation)
   * in User Tasks.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `handleEscalation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  handleEscalation$Response(params: {

    /**
     * The id of the task in which context a BPMN escalation is reported.
     */
    id: string;
    body?: CamundaTaskEscalationDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.HandleEscalationPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Reports an escalation in the context of a running task by id. The escalation code must
   * be specified to identify the escalation handler. See the documentation for
   * [Reporting Bpmn Escalation](https://docs.camunda.org/manual/7.14/reference/bpmn20/tasks/user-task/#reporting-bpmn-escalation)
   * in User Tasks.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `handleEscalation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  handleEscalation(params: {

    /**
     * The id of the task in which context a BPMN escalation is reported.
     */
    id: string;
    body?: CamundaTaskEscalationDto
  }): Observable<void> {

    return this.handleEscalation$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation claim
   */
  static readonly ClaimPath = '/task/{id}/claim';

  /**
   * Claims a task for a specific user.
   *
   * **Note:** The difference with the
   * [Set Assignee](https://docs.camunda.org/manual/7.14/reference/rest/task/post-assignee/)
   * method is that here a check is performed to see if the task already has a user
   * assigned to it.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `claim()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  claim$Response(params: {

    /**
     * The id of the task to claim.
     */
    id: string;

    /**
     * Provide the id of the user that claims the task.
     */
    body?: CamundaUserIdDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.ClaimPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Claims a task for a specific user.
   *
   * **Note:** The difference with the
   * [Set Assignee](https://docs.camunda.org/manual/7.14/reference/rest/task/post-assignee/)
   * method is that here a check is performed to see if the task already has a user
   * assigned to it.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `claim$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  claim(params: {

    /**
     * The id of the task to claim.
     */
    id: string;

    /**
     * Provide the id of the user that claims the task.
     */
    body?: CamundaUserIdDto
  }): Observable<void> {

    return this.claim$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation complete
   */
  static readonly CompletePath = '/task/{id}/complete';

  /**
   * Completes a task and updates process variables.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `complete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  complete$Response(params: {

    /**
     * The id of the task to complete.
     */
    id: string;
    body?: CamundaCompleteTaskDto
  }): Observable<StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.CompletePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>;
      })
    );
  }

  /**
   * Completes a task and updates process variables.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `complete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  complete(params: {

    /**
     * The id of the task to complete.
     */
    id: string;
    body?: CamundaCompleteTaskDto
  }): Observable<{ [key: string]: CamundaVariableValueDto }> {

    return this.complete$Response(params).pipe(
      map((r: StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>) => r.body as { [key: string]: CamundaVariableValueDto })
    );
  }

  /**
   * Path part for operation delegateTask
   */
  static readonly DelegateTaskPath = '/task/{id}/delegate';

  /**
   * Delegates a task to another user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delegateTask()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  delegateTask$Response(params: {

    /**
     * The id of the task to delegate.
     */
    id: string;

    /**
     * Provide the id of the user that the task should be delegated to.
     */
    body?: CamundaUserIdDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.DelegateTaskPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delegates a task to another user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delegateTask$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  delegateTask(params: {

    /**
     * The id of the task to delegate.
     */
    id: string;

    /**
     * Provide the id of the user that the task should be delegated to.
     */
    body?: CamundaUserIdDto
  }): Observable<void> {

    return this.delegateTask$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getDeployedForm
   */
  static readonly GetDeployedFormPath = '/task/{id}/deployed-form';

  /**
   * Retrieves the deployed form that is referenced from a given task. For further
   * information please refer to the
   * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#embedded-task-forms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDeployedForm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployedForm$Response(params: {

    /**
     * The id of the task to get the deployed form for.
     */
    id: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.GetDeployedFormPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/xhtml+xml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Retrieves the deployed form that is referenced from a given task. For further
   * information please refer to the
   * [User Guide](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#embedded-task-forms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDeployedForm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDeployedForm(params: {

    /**
     * The id of the task to get the deployed form for.
     */
    id: string;
  }): Observable<Blob> {

    return this.getDeployedForm$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getForm
   */
  static readonly GetFormPath = '/task/{id}/form';

  /**
   * Retrieves the form key for a task. The form key corresponds to the `FormData#formKey`
   * property in the engine. This key can be used to do task-specific form rendering in
   * client applications. Additionally, the context path of the containing process
   * application is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getForm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getForm$Response(params: {

    /**
     * The id of the task to retrieve the form for.
     */
    id: string;
  }): Observable<StrictHttpResponse<CamundaFormDto>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.GetFormPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CamundaFormDto>;
      })
    );
  }

  /**
   * Retrieves the form key for a task. The form key corresponds to the `FormData#formKey`
   * property in the engine. This key can be used to do task-specific form rendering in
   * client applications. Additionally, the context path of the containing process
   * application is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getForm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getForm(params: {

    /**
     * The id of the task to retrieve the form for.
     */
    id: string;
  }): Observable<CamundaFormDto> {

    return this.getForm$Response(params).pipe(
      map((r: StrictHttpResponse<CamundaFormDto>) => r.body as CamundaFormDto)
    );
  }

  /**
   * Path part for operation getFormVariables
   */
  static readonly GetFormVariablesPath = '/task/{id}/form-variables';

  /**
   * Retrieves the form variables for a task. The form variables take form data specified
   * on the task into account. If form fields are defined, the variable types and default
   * values of the form fields are taken into account.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFormVariables()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFormVariables$Response(params: {

    /**
     * The id of the task to retrieve the variables for.
     */
    id: string;

    /**
     * A comma-separated list of variable names. Allows restricting the list of requested
     * variables to the variable names in the list. It is best practice to restrict the
     * list of variables to the variables actually required by the form in order to
     * minimize fetching of data. If the query parameter is ommitted all variables are
     * fetched. If the query parameter contains non-existent variable names, the variable
     * names are ignored.
     */
    variableNames?: string;

    /**
     * Determines whether serializable variable values (typically variables that store
     * custom Java objects) should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and
     * transformed to JSON using [Jackson&#x27;s](http://jackson.codehaus.org/) POJO/bean
     * property introspection feature. Note that this requires the Java classes of the
     * variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string
     * containing XML.
     *
     * Note: While true is the default value for reasons of backward compatibility, we
     * recommend setting this parameter to false when developing web applications that are
     * independent of the Java process applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.GetFormVariablesPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('variableNames', params.variableNames, {});
      rb.query('deserializeValues', params.deserializeValues, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>;
      })
    );
  }

  /**
   * Retrieves the form variables for a task. The form variables take form data specified
   * on the task into account. If form fields are defined, the variable types and default
   * values of the form fields are taken into account.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFormVariables$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFormVariables(params: {

    /**
     * The id of the task to retrieve the variables for.
     */
    id: string;

    /**
     * A comma-separated list of variable names. Allows restricting the list of requested
     * variables to the variable names in the list. It is best practice to restrict the
     * list of variables to the variables actually required by the form in order to
     * minimize fetching of data. If the query parameter is ommitted all variables are
     * fetched. If the query parameter contains non-existent variable names, the variable
     * names are ignored.
     */
    variableNames?: string;

    /**
     * Determines whether serializable variable values (typically variables that store
     * custom Java objects) should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and
     * transformed to JSON using [Jackson&#x27;s](http://jackson.codehaus.org/) POJO/bean
     * property introspection feature. Note that this requires the Java classes of the
     * variable value to be on the REST API&#x27;s classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string
     * containing XML.
     *
     * Note: While true is the default value for reasons of backward compatibility, we
     * recommend setting this parameter to false when developing web applications that are
     * independent of the Java process applications deployed to the engine.
     */
    deserializeValues?: boolean;
  }): Observable<{ [key: string]: CamundaVariableValueDto }> {

    return this.getFormVariables$Response(params).pipe(
      map((r: StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>) => r.body as { [key: string]: CamundaVariableValueDto })
    );
  }

  /**
   * Path part for operation getRenderedForm
   */
  static readonly GetRenderedFormPath = '/task/{id}/rendered-form';

  /**
   * Retrieves the rendered form for a task. This method can be used to get the HTML
   * rendering of a
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRenderedForm()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRenderedForm$Response(params: {

    /**
     * The id of the task to get the rendered form for.
     */
    id: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.GetRenderedFormPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/xhtml+xml'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * Retrieves the rendered form for a task. This method can be used to get the HTML
   * rendering of a
   * [Generated Task Form](https://docs.camunda.org/manual/7.14/user-guide/task-forms/#generated-task-forms).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRenderedForm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRenderedForm(params: {

    /**
     * The id of the task to get the rendered form for.
     */
    id: string;
  }): Observable<Blob> {

    return this.getRenderedForm$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation resolve
   */
  static readonly ResolvePath = '/task/{id}/resolve';

  /**
   * Resolves a task and updates execution variables.
   *
   * Resolving a task marks that the assignee is done with the task delegated to them, and
   * that it can be sent back to the owner. Can only be executed when the task has been
   * delegated. The assignee will be set to the owner, who performed the delegation.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resolve()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resolve$Response(params: {

    /**
     * The id of the task to resolve.
     */
    id: string;
    body?: CamundaCompleteTaskDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.ResolvePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Resolves a task and updates execution variables.
   *
   * Resolving a task marks that the assignee is done with the task delegated to them, and
   * that it can be sent back to the owner. Can only be executed when the task has been
   * delegated. The assignee will be set to the owner, who performed the delegation.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `resolve$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resolve(params: {

    /**
     * The id of the task to resolve.
     */
    id: string;
    body?: CamundaCompleteTaskDto
  }): Observable<void> {

    return this.resolve$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation submit
   */
  static readonly SubmitPath = '/task/{id}/submit-form';

  /**
   * Completes a task and updates process variables using a form submit. There are two
   * difference between this method and the `complete` method:
   *
   * * If the task is in state `PENDING` - i.e., has been delegated before, it is not
   * completed but resolved. Otherwise it will be completed.
   * * If the task has Form Field Metadata defined, the process engine will perform backend
   * validation for any form fields which have validators defined.
   * See the
   * [Generated Task Forms](https://docs.camunda.org/manual/7.14/user-guide/task-forms/_index/#generated-task-forms)
   * section of the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/) for more information.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `submit()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  submit$Response(params: {

    /**
     * The id of the task to submit the form for.
     */
    id: string;
    body?: CamundaCompleteTaskDto
  }): Observable<StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.SubmitPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>;
      })
    );
  }

  /**
   * Completes a task and updates process variables using a form submit. There are two
   * difference between this method and the `complete` method:
   *
   * * If the task is in state `PENDING` - i.e., has been delegated before, it is not
   * completed but resolved. Otherwise it will be completed.
   * * If the task has Form Field Metadata defined, the process engine will perform backend
   * validation for any form fields which have validators defined.
   * See the
   * [Generated Task Forms](https://docs.camunda.org/manual/7.14/user-guide/task-forms/_index/#generated-task-forms)
   * section of the [User Guide](https://docs.camunda.org/manual/7.14/user-guide/) for more information.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `submit$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  submit(params: {

    /**
     * The id of the task to submit the form for.
     */
    id: string;
    body?: CamundaCompleteTaskDto
  }): Observable<{ [key: string]: CamundaVariableValueDto }> {

    return this.submit$Response(params).pipe(
      map((r: StrictHttpResponse<{ [key: string]: CamundaVariableValueDto }>) => r.body as { [key: string]: CamundaVariableValueDto })
    );
  }

  /**
   * Path part for operation unclaim
   */
  static readonly UnclaimPath = '/task/{id}/unclaim';

  /**
   * Resets a task's assignee. If successful, the task is not assigned to a user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unclaim()` instead.
   *
   * This method doesn't expect any request body.
   */
  unclaim$Response(params: {

    /**
     * The id of the task to unclaim.
     */
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CamundaTaskService.UnclaimPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Resets a task's assignee. If successful, the task is not assigned to a user.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unclaim$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unclaim(params: {

    /**
     * The id of the task to unclaim.
     */
    id: string;
  }): Observable<void> {

    return this.unclaim$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
