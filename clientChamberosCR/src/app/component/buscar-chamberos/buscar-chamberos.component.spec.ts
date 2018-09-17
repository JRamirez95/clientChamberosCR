import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarChamberosComponent } from './buscar-chamberos.component';

describe('BuscarChamberosComponent', () => {
  let component: BuscarChamberosComponent;
  let fixture: ComponentFixture<BuscarChamberosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarChamberosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarChamberosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
