import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wk5accountComponent } from './wk5account.component';

describe('Wk5accountComponent', () => {
  let component: Wk5accountComponent;
  let fixture: ComponentFixture<Wk5accountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wk5accountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wk5accountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
