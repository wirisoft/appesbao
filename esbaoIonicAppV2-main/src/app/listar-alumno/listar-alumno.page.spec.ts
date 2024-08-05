import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarAlumnoPage } from './listar-alumno.page';

describe('ListarAlumnoPage', () => {
  let component: ListarAlumnoPage;
  let fixture: ComponentFixture<ListarAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
