
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntajeComponent } from './puntaje.component';

describe('PuntajeComponent', () => {
  let component: PuntajeComponent;
  let fixture: ComponentFixture<PuntajeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
