import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevantarCitatorioPage } from './levantar-citatorio.page';

describe('LevantarCitatorioPage', () => {
  let component: LevantarCitatorioPage;
  let fixture: ComponentFixture<LevantarCitatorioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LevantarCitatorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
