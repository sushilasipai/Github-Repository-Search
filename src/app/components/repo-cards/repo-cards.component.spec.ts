import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoCardsComponent } from './repo-cards.component';

describe('RepoCardsComponent', () => {
  let component: RepoCardsComponent;
  let fixture: ComponentFixture<RepoCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
