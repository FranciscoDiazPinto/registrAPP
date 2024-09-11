import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Index2Page } from './index2.page';

describe('Index2Page', () => {
  let component: Index2Page;
  let fixture: ComponentFixture<Index2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Index2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
