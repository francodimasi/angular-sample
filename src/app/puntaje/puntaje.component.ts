import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'puntaje',
  templateUrl: './puntaje.component.html',
  styleUrls: ['./puntaje.component.css']
})
export class PuntajeComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  cards = [
    { title: 'Tus puntos', cols: 1, rows: 1 },
    { title: 'Tabla de Posiciones', cols: 1, rows: 2 },
    { title: 'Ganadores', cols: 1, rows: 1 }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {}


}
