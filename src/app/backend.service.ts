import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, mergeMap, delay } from 'rxjs/operators';

import { Match } from './match.model';
import { Prediction, Predicted } from './prediction.model';
import { Login } from './login.model';
import { del } from 'selenium-webdriver/http';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiBase: string = 'https://prode2018-gruposupervielle.mybluemix.net/api/v1';

  constructor(private http: HttpClient) {}

  getFixture(tournamentStage: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiBase}/match/get-matchs-with-availability?tournamentStage=${tournamentStage}`)
      .pipe(
        tap(fixture => fixture.forEach(match => {
            this.getPrediction(match.id).subscribe(prediction => {
                match.prediction = prediction[0];
            })   
          })
        ),
        catchError(this.handleError('getFixture', []))
      );
  }

  getPrediction(matchId: string): Observable<Predicted[]> {
    return this.http.get<Predicted[]>(`${this.apiBase}/prediction?match=${matchId}&sort=predictionIdAI%20DESC`)
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
    login.emailAddress = login.emailAddress.replace(/\s/g, "");
    return this.http.put<any>(`${this.apiBase}/entrance/login`, { emailAddress: login.emailAddress, password: login.password, apiLogin: true })
        .pipe(map((res: any) => {
            // login successful if there's a jwt token in the response
            if (res && res.jwt) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ emailAddress: login.emailAddress, fullName: res.fullName, token: res.jwt, forceChangePassword: res.forceChangePassword }));
            }
        }));
    }

    changePassword(password: string) {
      return this.http.post<any>(`${this.apiBase}/account/update-password-rest`, { password: password });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isLoggedIn(): Observable<boolean> {
      if (localStorage.getItem('currentUser')) {
        return of(true);
      } else {
        return of(false);
      }
    }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error); 
      // console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
