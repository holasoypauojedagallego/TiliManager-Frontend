import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidoligaPage } from './partidoliga.page';

describe('PartidoligaPage', () => {
  let component: PartidoligaPage;
  let fixture: ComponentFixture<PartidoligaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidoligaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
