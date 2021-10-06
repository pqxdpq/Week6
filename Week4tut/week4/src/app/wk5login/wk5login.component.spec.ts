import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wk5loginComponent } from './wk5login.component';

describe('Wk5loginComponent', () => {
  let component: Wk5loginComponent;
  let fixture: ComponentFixture<Wk5loginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wk5loginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wk5loginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
