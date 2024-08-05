import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarCitatorioPage } from './listar-citatorio.page';

describe('ListarCitatorioPage', () => {
  let component: ListarCitatorioPage;
  let fixture: ComponentFixture<ListarCitatorioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCitatorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
