import { Component, DoCheck } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendService } from '../backend.service';

@Component({
  selector: 'prode',
  templateUrl: './prode.component.html',
  styleUrls: ['./prode.component.css']
})
export class ProdeComponent implements DoCheck {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  currentUser: any;
  isLoggedIn$: Observable<boolean>;
    
  constructor(private breakpointObserver: BreakpointObserver, private backendService: BackendService) {}

  ngDoCheck() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isLoggedIn$ = this.backendService.isLoggedIn().pipe(map(result => result));
  }

  logout() {
    this.backendService.logout();
    window.location.reload();
  }
  
  }
