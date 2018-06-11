import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendService } from '../backend.service';


@Component({
  selector: 'prode',
  templateUrl: './prode.component.html',
  styleUrls: ['./prode.component.css']
})
export class ProdeComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    currentUser: any;
    
  constructor(private breakpointObserver: BreakpointObserver, private backendService: BackendService) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    this.backendService.logout();
  }
  
  }
