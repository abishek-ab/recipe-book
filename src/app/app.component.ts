import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  routeSelector;
  title = 'udemyapp';
  onEvent(data){
   this.routeSelector=data;
  }
}
