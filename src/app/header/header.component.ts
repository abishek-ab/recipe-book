import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() selecti=new EventEmitter<string>();
  constructor(private dataStorageService:DataStorageService) { }

  ngOnInit() {
  }

  onSaveData(){
    this.dataStorageService.saveAllData();
  }

  onFetchData(){
    this.dataStorageService.fetchAllData().subscribe();
  }
}
