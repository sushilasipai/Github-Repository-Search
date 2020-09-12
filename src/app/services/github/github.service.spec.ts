import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('GithubService', () => {
  let githubService: GithubService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });

    //inject github service and test controller
    githubService = TestBed.get(GithubService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(githubService).toBeTruthy();
  });

  it('should get repositories from api via GET request', () => {
    const mockResult = {
      total_count: 2,
      incomplete_results: false,
      items: [{ id: 123, name: 'abc' }],
    };

    const url =
      'https://api.github.com/search/repositories?q=somestring&sort=stars&order=desc&page=1&per_page=10';

    githubService.getRepoInfo(url).subscribe((data) => {
      expect(data).toBeDefined;
      expect(data.incomplete_results).toEqual(false);
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(mockResult);
  });

  it('should return details of the selected repository', () => {
    const fakeRepos = [
      { id: 1, name: 'abc' },
      { id: 2, name: 'def' },
    ];

    const expectedRepo = JSON.parse(JSON.stringify({ id: 1, name: 'abc' }));

    sessionStorage.setItem('repos', JSON.stringify(fakeRepos));

    expect(sessionStorage.getItem('repos')).toBeDefined;

    var fakeRepoDetail = githubService.getRepoDetails(1);

    expect(fakeRepoDetail).toEqual(expectedRepo);
  });
});
