import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReposComponent } from './repos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReposComponent', () => {
  let reposComponent: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReposComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposComponent);
    reposComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(reposComponent).toBeTruthy();
  });
});
