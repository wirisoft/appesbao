import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevantarTutorPage } from './levantar-tutor.page';

describe('LevantarTutorPage', () => {
  let component: LevantarTutorPage;
  let fixture: ComponentFixture<LevantarTutorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LevantarTutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
