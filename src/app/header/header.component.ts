import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated=false;
  @Output() selecti=new EventEmitter<string>();
  constructor(private dataStorageService:DataStorageService,
    private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.loginUser.subscribe(user=>{
      console.log(user);
      if(user){
        this.isAuthenticated=true;
      }
      
    })
  }

  onSaveData(){
    this.dataStorageService.saveAllData();
  }

  onFetchData(){
    this.dataStorageService.fetchAllData().subscribe();
  }

  

  logout(){
    this.authenticationService.logout();
    this.isAuthenticated=false;
  }
}
