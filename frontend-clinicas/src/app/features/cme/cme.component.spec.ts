import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmeComponent } from './cme.component';

describe('CmeComponent', () => {
  let component: CmeComponent;
  let fixture: ComponentFixture<CmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
