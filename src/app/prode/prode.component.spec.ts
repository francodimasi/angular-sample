
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdeComponent } from './prode.component';

describe('ProdeNavComponent', () => {
  let component: ProdeComponent;
  let fixture: ComponentFixture<ProdeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
