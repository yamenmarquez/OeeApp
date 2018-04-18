import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpstopCreateComponent } from './npstop-create.component';

describe('NpstopCreateComponent', () => {
  let component: NpstopCreateComponent;
  let fixture: ComponentFixture<NpstopCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpstopCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpstopCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
