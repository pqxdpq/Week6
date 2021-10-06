import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wk5profileComponent } from './wk5profile.component';

describe('Wk5profileComponent', () => {
  let component: Wk5profileComponent;
  let fixture: ComponentFixture<Wk5profileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wk5profileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wk5profileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
