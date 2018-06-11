import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

import { Match } from '../match.model';
import { Prediction, Predicted } from '../prediction.model';
import { BackendService } from '../backend.service';

@Component({
  selector: 'fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  panelOpenState: boolean = false;
  phaseOne$: Observable<Match[]> = this.backendService.getFixture(0);
  phaseTwo$: Observable<Match[]> = this.backendService.getFixture(1);
  phaseThree$: Observable<Match[]> = this.backendService.getFixture(2);
  

  constructor(public snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver, private backendService: BackendService) { }

  ngOnInit() {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  onSubmit(matchForm: NgForm) {
    if (matchForm.valid) {
      this.backendService.postPrediction(matchForm.value)
      .subscribe(() => {
        this.openSnackBar('Guardando...', '')
      });
    }
  }

}
