import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Score } from '../score.model';
import { Ranking } from '../ranking.model';
import { BackendService } from '../backend.service';

@Component({
  selector: 'puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit {
  rankingColumns = ['position', 'fullName','totalMultiplier', 'emailAddress'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  score$: Observable<Score[]> = this.backendService.getScore();
  ranking$: Observable<Ranking[]> = this.backendService.getRanking();
  total$: number = 0;
  position$: number = 0;
  rankingSource = new MatTableDataSource<Ranking>();

  constructor(private breakpointObserver: BreakpointObserver, private backendService: BackendService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.rankingSource.paginator = this.paginator;
    
    this.score$.subscribe(
      scores => {
      scores.forEach(score => {
        this.total$ += score.multiplier;
      });
    });

    this.ranking$.subscribe(
      ranking => {
        ranking.forEach(position => {
          this.position$ += 1
          position.position = this.position$;
          position.emailAddress = position.emailAddress.substring(position.emailAddress.lastIndexOf('@') + 1);
        });
        this.rankingSource.data = ranking;
      });

  }

}