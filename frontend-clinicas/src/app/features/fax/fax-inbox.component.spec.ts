import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaxInboxComponent } from './fax-inbox.component';

describe('FaxInboxComponent', () => {
  let component: FaxInboxComponent;
  let fixture: ComponentFixture<FaxInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaxInboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaxInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
