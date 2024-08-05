import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarCitatorioPage } from './editar-citatorio.page';

describe('EditarCitatorioPage', () => {
  let component: EditarCitatorioPage;
  let fixture: ComponentFixture<EditarCitatorioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCitatorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
