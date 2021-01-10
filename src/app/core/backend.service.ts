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

  getRecipe(id: number): Observable<MenuItem> {
    const authHeaders = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getIdToken()});
    return this.http.get<MenuItem>(this.baseUrl + 'recipes/' + id, {headers: authHeaders, responseType: 'json'})
  }

  getImage(recipeId: number, imageId: number): Observable<Blob> {
    const authHeaders = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getIdToken()});
    console.log('url: ' + this.baseUrl + 'recipes/' + recipeId + '/img/' + imageId);
    return this.http.get<Blob>(this.baseUrl + 'recipes/' + recipeId + '/img/' + imageId, {headers: authHeaders, responseType: 'blob' as 'json'})
  }

  addRecipe(recipe: any) {
    let formData = this.convertToFormData(recipe, true);
    const authHeaders = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getIdToken()});
    return this.http.post<any>(this.baseUrl + 'recipes', formData, {headers: authHeaders, responseType: 'json'});
  }

  changeRecipe(recipe: any) {
    let formData = this.convertToFormData(recipe, false);
    const authHeaders = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getIdToken()});
    return this.http.post<any>(this.baseUrl + 'recipes', formData, {headers: authHeaders, responseType: 'json'});
  }

  deleteRecipe(id: number) {
    const authHeaders = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getIdToken()});
    return this.http.delete<any>(this.baseUrl + 'recipes/' + id, {headers: authHeaders, responseType: 'json'})
  }

  convertToFormData(recipe: any, isNew: boolean): any {
    let formData = new FormData();
    if (!isNew) {
      formData.append('id', recipe.id);
    }
    formData.append('title', recipe.title);
    formData.append('description', recipe.description);
    formData.append('category', recipe.category);
    formData.append('effort', recipe.effort);
    formData.append('tags', recipe.tags);
    formData.append('image1', recipe.image1);
    formData.append('image2', recipe.image2);
    formData.append('image3', recipe.image3);
    return formData;
  }

  getCategories(): Observable<string[]> {
    const authHeaders = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getIdToken()});
    return this.http.get<string[]>(this.baseUrl + 'categories', {headers: authHeaders, responseType: 'json'})
  }

  getEffortValues(): Observable<string[]> {
    const authHeaders = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getIdToken()});
    return this.http.get<string[]>(this.baseUrl + 'effort-values', {headers: authHeaders, responseType: 'json'})
  }

  getTags(): Observable<string[]> {
    const authHeaders = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getIdToken()});
    return this.http.get<string[]>(this.baseUrl + 'tags', {headers: authHeaders, responseType: 'json'})
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
