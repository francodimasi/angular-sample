import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit {
  displayedColumns = ['position', 'name', 'score'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {}

}

export interface ScoreElement {
  name: string;
  position: number;
  score: number;
}

const ELEMENT_DATA: ScoreElement[] = [];