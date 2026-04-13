import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidoPage } from './partido.page';

describe('PartidoPage', () => {
  let component: PartidoPage;
  let fixture: ComponentFixture<PartidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
