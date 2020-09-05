import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  //http get request
  getRepoInfo(url): Observable<any> {
    return this.http.get<any>(url);
  }
}
