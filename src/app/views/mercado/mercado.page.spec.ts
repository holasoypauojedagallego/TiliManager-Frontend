import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercadoPage } from './mercado.page';

describe('MercadoPage', () => {
  let component: MercadoPage;
  let fixture: ComponentFixture<MercadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
