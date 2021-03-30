import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'simple-user-info',
  templateUrl: './simple-user-info.component.html',
  styleUrls: ['./simple-user-info.component.css']
})
export class SimpleUserInfoComponent implements OnInit {

  public isLoggedIn = false;
  public userProfile: KeycloakProfile=<KeycloakProfile>{};

  constructor(private readonly keycloak: KeycloakService) { }

  public ngOnInit() {

    this.keycloak.isLoggedIn().then(res => {
      if (res){
        this.keycloak.loadUserProfile().then(profile => {
          this.isLoggedIn = true;
          this.userProfile= profile;
        })
      }
    })


  }

  public logout(){
    console.log("logout");
    this.keycloak.isLoggedIn().then(res => {
        this.keycloak.logout();

    });

  }
}
