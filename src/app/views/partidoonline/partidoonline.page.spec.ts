import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidoonlinePage } from './partidoonline.page';

describe('PartidoonlinePage', () => {
  let component: PartidoonlinePage;
  let fixture: ComponentFixture<PartidoonlinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidoonlinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
