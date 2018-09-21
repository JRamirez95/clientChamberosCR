import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchChamberosComponent } from './search-chamberos.component';

describe('SearchChamberosComponent', () => {
  let component: SearchChamberosComponent;
  let fixture: ComponentFixture<SearchChamberosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchChamberosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchChamberosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
