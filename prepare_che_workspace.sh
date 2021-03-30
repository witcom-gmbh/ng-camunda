#!/bin/bash
npm config set prefix '~/.local/'
yes| npm install --global @angular/cli ng-openapi-gen
export PATH=~/.local/bin/:$PATH
cd /projects/ng-camunda/projects/ng-camunda/core/ && npm install && cd /projects/ng-camunda
npm install



