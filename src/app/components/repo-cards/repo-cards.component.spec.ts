import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoCardsComponent } from './repo-cards.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('RepoCardsComponent', () => {
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  let component: RepoCardsComponent;
  let fixture: ComponentFixture<RepoCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RepoCardsComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to details page', () => {
    component.showDetails(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['details', 1]);
  });
});
