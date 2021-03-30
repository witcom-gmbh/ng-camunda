# NG Camunda
NG Camunda is an Angular library which can be used to build custom tasklists. It uses FormIO to render user-forms. 
If you run a keycloak-protected Camunda REST-Engine* it easily integrates with keycloak-angular. 

*See https://github.com/iceman91176/camunda-bpm-auth-keycloak-sso - running camunda behind oauth-proxy works, too

## Why
There are some implementations around that integrate camunda and formio. But most of them use the existing tasklist-application. That is ok - but sometimes not enough.

## Requirements

* Camunda ;-) Tested with 7.14.x. Enable CORS for the REST-ENGINE either in the Tomcat-Config or on your API-Gateway if your are using one
* Formio - we use our own flavor (https://github.com/iceman91176/formio-docker). But placing the JSON-definition as a static file on a webserver (or in your angular-application) also works
* Angular  >= 11.2

## Important
We rarely use Java-Delegates in the process-engine - we rely on external-taks and some scripts within the BPMN. JSON is our number one choice for storing and passing variables around.

This implementation maps process-variables to form-components. Therefore it is important to understand that you carefully model your process & think about the variables you will need & use throughout your process. Variables will only be created whe starting a process-instance. In all following user-tasks the process-variables will only be updated. This ist not a limitation of camunda or our library - in fact the first version was able to create variables also. But when dealing with authorizations in camunda things get complex, and so we decided not to go that way. The old code is still there - we just commented it out.

## Model the process 
First things first. Model your process & think about the variables you will need & use throughout your process. Variables which are not present in the process will cannot be added in User-Tasks

<IMG - PROCESS >

You can find a - very - simple process in the examples-folder

## Model the forms
Currently we are using the Formio Web-Application for designing the form. It has the following limitations, but works.

* only access the form-definition by id, not by "definition-name"
* no possibility to duplicate existing forms
* no possibility for custom components (API with own auth, File-Upload with Auth, etc.)

We are planning to add our own builder based on Formio-Angular (https://github.com/formio/angular/wiki/Form-Builder), and our own backend for storing the form-definitions.

You can find 2 simple form-definitions in the examples folder. Place them on a webserver under /form/ and don't foregt to adjust the formkey of the BPMN-Activity

* start-form.json
* user-task-form.json

### Basic form-data
Create a new form. Give it a name, machinename and a path

### Add form-components
Add any component you like. Use content-elements to place them nicely. The following rules apply

* The property-name/API key has to match the process-variable. That means in a start-form a variable with that name is created. In task-forms, this property will be populated from the process, and if updated can be submitted to the form
* Only components/fields that are marked as persistent will be used at all
* Components that are disabled will be ignored
* Buttons will be ignored

It is possible to use all features of formio to achieve great results, e.g. build a JSON-Object from multiple fields and store it in a hidden field, use API-Calls...

### Supported actions
Currently the following actions are supported

| *Formio-Button-Action* | *Config* | *What does it do ?* |
| --- | --- | --- |
| `submit` | - | Submits the form and either starts the process or completes the task
| `event` | save-form | Stores the state of a task (the variables). Only valid for User-Tasks
| `event` | escalation-non-interrupting<br/>Provide custom-property 'escalationCode' with camunda-escalation-code  | escalate the task - only valid for User-Tasks

### Start form & business key
There are two options to provide a buiness-key.

#### Let formio do the work
Let formio generate on - e.g. Prefix + Timestamp, Pull it from API, whatever. Or enter one manually.
In that case you have to name the form field **businesskey** - that is all.

#### Pass businesskey to the component
See API-Description for **process-start-form**

## Combine process and form
Basically you reference the forms in the start-activity and in task-activities. We use the **form key** property. The format is as follows

```
 formio:REFERENCE-ID-OF-THE-FORM
```
What is the reference-id ? It depends ;-) If you use the formio-webapp, than it is the UUID of the form, if you place the JSON on a webserver, it's the filename.

That's it - deploy the form as usual.

## Use the library
### Installation
Add the following dependencies to your project

* @ng-bootstrap/ng-bootstrap >= 9
* formiojs >= 4.12.7
* @formio/angular >= 5.0.2
* plus some more ;-)

Install library
```
 npm install @ng-camunda/core --save
``` 
### Configure your application
#### Add imports to your app.module.ts

```
import {CamundaEngineConfiguration,CamundaFormsConfiguration,CamundaEngine,CamundaFormsModule} from '@ng-camunda/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CamundaEngine.forRoot({rootUrl:"http://my-camunda-instance/engine-rest"}),
    CamundaFormsModule.forRoot({formioRootUrl:"http://my-formio-instance"}),
    ....
  ],
  providers: [CONFIG_PROVIDER, CONFIG_DEPENDENCIES],
  bootstrap: [AppComponent]
})
``` 

Beware - if you are using static JSON-Files for formio-definitions -> place them under formioRootUrl/form/. 

### Usage Start-Form

``` 
import { Component, OnInit } from '@angular/core';
import { CamundaProcessDefinitionService, CamundaProcessInstanceWithVariablesDto } from '@ng-camunda/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process-start',
  templateUrl: './process-start.component.html',
  styleUrls: ['./process-start.component.css']
})
export class ProcessStartComponent implements OnInit {

  processDefId:string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.processDefId = this.route.snapshot.paramMap.get('id');
  }
  onStartSuccess(instance:CamundaProcessInstanceWithVariablesDto):void{
    console.log(instance);
  }

}
``` 

The template looks like that

``` 
<process-start-form [processDefId]="processDefId" (startSuccess)="onStartSuccess($event)"></process-start-form>
``` 

#### Inputs Start-Form

| *Name* | *Type* | *Description* |
| --- | --- | --- |
| `processDefId` | string | ID of the process-definition

#### Outputs Start-Form

| *Name* | *Type* | *Description* |
| --- | --- | --- |
| `startSuccess` | CamundaProcessInstanceWithVariablesDto | Process-Instance

### Usage Task-Form
See the example app for a more complete example, including claiming the task.

```
              <task-form (escalateSuccess)="escalateSuccess($event)" (completeSuccess)="completeSuccess($event)" (saveSuccess)="taskStateSaved($event)" [readOnly]="!isMyTask()" [taskId]="selectedTask.id"></task-form>
``` 

#### Inputs Task-Form

| *Name* | *Type* | *Description* |
| --- | --- | --- |
| `readOnly` | boolean | Render form as read-only. Helpful for viewing task that are not assigned to the user
| `taskId` | string | Task id

#### Outputs Task-Form

| *Name* | *Type* | *Description* |
| --- | --- | --- |
| `completeSuccess` | CamundaCompleteTaskDto | Successfull completion of task
| `saveSuccess` | void | task-state saved
| `escalateSuccess` | void | escalation successful

## Task-List replacement
The included-demo application includes a very simple task-list. The focus is on form-handling currently





