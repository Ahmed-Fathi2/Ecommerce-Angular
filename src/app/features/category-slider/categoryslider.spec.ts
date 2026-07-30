import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoryslider } from './categoryslider';

describe('Categoryslider', () => {
  let component: Categoryslider;
  let fixture: ComponentFixture<Categoryslider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categoryslider],
    }).compileComponents();

    fixture = TestBed.createComponent(Categoryslider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
