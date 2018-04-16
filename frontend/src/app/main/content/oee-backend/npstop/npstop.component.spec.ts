import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpstopComponent } from './npstop.component';

describe('NpstopComponent', () => {
  let component: NpstopComponent;
  let fixture: ComponentFixture<NpstopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpstopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpstopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
