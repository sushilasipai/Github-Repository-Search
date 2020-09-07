import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  repos: String[];
  itemPerPage: number;
  sortCriteria: string;
  repoSearchString: String;
  selectedId: String;
  repoDetail: String;
  backFlg = false;
  page: number;

  constructor(private http: HttpClient) {}

  //http get request
  getRepoInfo(url): Observable<any> {
    return this.http.get<any>(url);
  }

  //gets details of the selected repository
  getRepoDetails(): String {
    this.repos.filter((data) => {
      if (data['id'] == this.selectedId) {
        this.repoDetail = JSON.parse(JSON.stringify(data));
      }
    });
    return this.repoDetail;
  }
}
