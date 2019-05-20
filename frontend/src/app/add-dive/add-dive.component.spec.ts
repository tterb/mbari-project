import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiveComponent } from './add-dive.component';

describe('AddDiveComponent', () => {
  let component: AddDiveComponent;
  let fixture: ComponentFixture<AddDiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
