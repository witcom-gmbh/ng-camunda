import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleUserInfoComponent } from './components/simple-user-info/simple-user-info.component';
import { TabbingClickDirective } from './directives/tabbing-click.directive';
import { CamundaUserProfileComponent } from './components/camunda-user-profile/camunda-user-profile.component';
import { AvatarModule } from 'ngx-avatar';


@NgModule({
  declarations: [SimpleUserInfoComponent, TabbingClickDirective, CamundaUserProfileComponent],
  imports: [
    CommonModule,
    AvatarModule
  ],
  exports: [
    SimpleUserInfoComponent,
    TabbingClickDirective,
    CamundaUserProfileComponent
  ]
})
export class SharedModule { }
