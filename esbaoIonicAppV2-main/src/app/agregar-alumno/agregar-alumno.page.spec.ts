import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarAlumnoPage } from './agregar-alumno.page';

describe('AgregarAlumnoPage', () => {
  let component: AgregarAlumnoPage;
  let fixture: ComponentFixture<AgregarAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
