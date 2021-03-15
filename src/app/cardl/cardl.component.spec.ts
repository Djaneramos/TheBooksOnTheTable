import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlComponent } from './cardl.component';

describe('CardlComponent', () => {
  let component: CardlComponent;
  let fixture: ComponentFixture<CardlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
