import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MAT_PAGINATOR_INTL_PROVIDER } from '@angular/material';

import { Score } from '../score.model';
import { BackendService } from '../backend.service';

@Component({
  selector: 'puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit {
  displayedColumns = ['total'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  score$: Observable<Score[]> = this.backendService.getScore();
  total$: number = 0;
  details: Score[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private backendService: BackendService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.score$.subscribe(
      scores => {
      scores.forEach(score => {
        this.total$ += score.multiplier;
      });
      this.details = scores;
    });
  }

}