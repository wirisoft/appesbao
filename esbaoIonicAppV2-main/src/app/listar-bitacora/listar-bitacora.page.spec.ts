import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarBitacoraPage } from './listar-bitacora.page';

describe('ListarBitacoraPage', () => {
  let component: ListarBitacoraPage;
  let fixture: ComponentFixture<ListarBitacoraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBitacoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
