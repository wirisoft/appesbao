import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarBitacoraPage } from './editar-bitacora.page';

describe('EditarBitacoraPage', () => {
  let component: EditarBitacoraPage;
  let fixture: ComponentFixture<EditarBitacoraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarBitacoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
