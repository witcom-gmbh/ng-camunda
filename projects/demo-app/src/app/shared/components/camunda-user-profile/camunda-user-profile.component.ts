import { Component, OnInit, Input } from '@angular/core';
import {CamundaUserService, CamundaUserProfileDto} from '@ng-camunda/core';
import { NGXLogger } from 'ngx-logger';
import { shareReplay, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

const CACHE_SIZE = 1;

@Component({
  selector: 'camunda-user-profile',
  templateUrl: './camunda-user-profile.component.html',
  styleUrls: ['./camunda-user-profile.component.css']
})
export class CamundaUserProfileComponent implements OnInit {

  @Input() userName:string;
  userProfile:CamundaUserProfileDto;
  avatarName:string;

  constructor(
    private logger: NGXLogger,
    private camundaUserService:CamundaUserService
  ) { }

  ngOnInit(): void {
    if (this.userName){
      this.getUser(this.userName).subscribe(res=>{
        this.userProfile=res as CamundaUserProfileDto;
        this.avatarName=this.userProfile.firstName + " "+ this.userProfile.lastName;
      });
    }
  }

  getUser(userName:string){

    return this.camundaUserService.getUserProfile({id:userName}).pipe(
        catchError(err => {
              throw new Error('Benutzerprofil konnte nicht geladen werden');
            }
        ),
        shareReplay(CACHE_SIZE),
        //map(res => res[0])
    );

  }

}
