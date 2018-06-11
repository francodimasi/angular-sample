import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';

import { Match } from './match.model';
import { Prediction, Predicted } from './prediction.model';
import { Login } from './login.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiBase = 'https://api-prode-dev.mybluemix.net/api/v1';

  constructor(private http: HttpClient) {}

  getFixture(tournamentStage: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiBase}/match?tournamentStage=${tournamentStage}`)
      .pipe(
        tap(fixture => fixture.forEach(match => {
            this.getPrediction(match.id).subscribe(prediction => {
                match.prediction = prediction[0];
                let date1: number = Date.parse(match.matchTime);
                let date2: number = Date.now();
                if ((((date1 - date2) / 1000 / 60 / 60) > 2) && !match.prediction) {
                  match.canBet = true;
                } else {
                  match.canBet = false;
                }
            })   
          })
        ),
        catchError(this.handleError('getFixture', []))
      );
  }

  getPrediction(matchId: string): Observable<Predicted[]> {
    return this.http.get<Predicted[]>(`${this.apiBase}/prediction?match=${matchId}`)
      .pipe(      
        catchError(this.handleError('getPrediction', []))
      );
  }

  postPrediction(prediction: Prediction): Observable<Prediction> {
    return this.http.post<Prediction>(`${this.apiBase}/prediction`, prediction, httpOptions).pipe(
      catchError(this.handleError<Prediction>('prediction'))
    );
  }

  login(login: Login) {
    return this.http.put<any>(`${this.apiBase}/entrance/login`, { emailAddress: login.emailAddress, password: login.password, apiLogin: true })
        .pipe(map((res:any) => {
            // login successful if there's a jwt token in the response
            if (res && res.jwt) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ emailAddress: login.emailAddress, fullName: res.fullName, token: res.jwt }));
            }
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error); 
      // console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
