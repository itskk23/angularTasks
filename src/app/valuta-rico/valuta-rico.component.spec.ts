import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValutaRicoComponent } from './valuta-rico.component';

describe('ValutaRicoComponent', () => {
  let component: ValutaRicoComponent;
  let fixture: ComponentFixture<ValutaRicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValutaRicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValutaRicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
