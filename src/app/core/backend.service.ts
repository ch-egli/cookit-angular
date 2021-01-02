import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {MenuItem} from './backend.models';
import {AuthService} from './auth.service';

@Injectable()
export class BackendService {
  baseUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.backendUrl + '/api/';
  }

  getRecipes(): Observable<MenuItem[]> {
    //console.log('getRecipes - id token: ' + this.authService.getIdToken())
    const authHeaders = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getIdToken()});
    return this.http.get<MenuItem[]>(this.baseUrl + 'recipes', {headers: authHeaders, responseType: 'json'})
/*

    .pipe(
      retry(3),
      catchError((errors) => {
        console.log('error: ' + JSON.stringify(errors));
        return EMPTY;
      }),
      shareReplay()
    );
*/
  }

  /*
     getAthletes(): Observable<string[]> {
         // console.log('getAthletes...');
         return this.http.get<string[]>(this.baseUrl + 'athletes');
     }

     getPagedWorkouts(username: string, page: number, pageSize: number): Observable<WorkoutPageable> {
         return this.http.get<WorkoutPageable>(this.baseUrl + 'users/' + username
             + '/workouts?page=' + page + '&size=' + pageSize);
     }

     getPagedStati(username: string, page: number, pageSize: number): Observable<StatusPageable> {
         return this.http.get<StatusPageable>(this.baseUrl + 'users/' + username
             + '/status?page=' + page + '&size=' + pageSize);
     }

     getWorkout(username: string, id: number): Observable<Workout> {
         return this.http.get<Workout>(this.baseUrl + 'users/all/workouts/' + id);
     }

     addWorkout(workout: Workout) {
         return this.http.post<Workout>(this.baseUrl + 'users/' + workout.benutzername + '/workouts', workout);
     }

     changeWorkout(workout: Workout, workoutId: number) {
         return this.http.put<Workout>(this.baseUrl + 'users/' + workout.benutzername + '/workouts/' + workoutId, workout);
     }

     deleteWorkout(user: string, workoutId: number) {
         return this.http.delete(this.baseUrl + 'users/' + user + '/workouts/' + workoutId);
     }

     getStati(username: string, nbRecords: number): Observable<any> {
         return this.http.get<any>(this.baseUrl + 'users/' + username + '/status?page=0&size=' + nbRecords);
     }

     getStatus(username: string, id: number): Observable<Status> {
         return this.http.get<Status>(this.baseUrl + 'users/all/status/' + id);
     }

     addStatus(status: Status) {
         return this.http.post<Status>(this.baseUrl + 'users/' + status.benutzername + '/status', status);
     }

     changeStatus(status: Status, statusId: number) {
         return this.http.put<Status>(this.baseUrl + 'users/' + status.benutzername + '/status/' + statusId, status);
     }

     deleteStatus(user: string, statusId: number) {
         return this.http.delete(this.baseUrl + 'users/' + user + '/status/' + statusId);
     }

     downloadFile(user: string, year: string) {
         return this.http.get(this.baseUrl + 'users/' + user + '/excelresults/' + year,
             { responseType: 'blob' as 'json' });
     }
 */
}
