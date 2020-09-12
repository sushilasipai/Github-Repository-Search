import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  repos: String[];
  repoDetail: String;

  constructor(private http: HttpClient) {}

  //http get request
  getRepoInfo(url): Observable<any> {
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  //error handler
  handleError(error: HttpErrorResponse) {
    return throwError(error.statusText || 'Server Error');
  }

  //gets details of the selected repository
  getRepoDetails(id): String {
    this.repos = JSON.parse(sessionStorage.getItem('repos') || null);
    if (this.repos) {
      this.repos.filter((data) => {
        if (data['id'] == id) {
          this.repoDetail = JSON.parse(JSON.stringify(data || null));
        }
      });
    }
    return this.repoDetail;
  }
}
