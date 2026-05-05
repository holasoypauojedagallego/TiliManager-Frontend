import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LigasPage } from './ligas.page';

describe('LigasPage', () => {
  let component: LigasPage;
  let fixture: ComponentFixture<LigasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LigasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
