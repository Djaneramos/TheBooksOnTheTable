import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodycComponent } from './bodyc.component';

describe('BodycComponent', () => {
  let component: BodycComponent;
  let fixture: ComponentFixture<BodycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodycComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
