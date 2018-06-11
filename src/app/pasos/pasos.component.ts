import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'pasos',
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.css']
})
export class PasosComponent implements OnInit {

  firstTime: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toogleFirstTime() {
    if (this.firstTime) {
      this.firstTime = false;
    } 
  }

}
