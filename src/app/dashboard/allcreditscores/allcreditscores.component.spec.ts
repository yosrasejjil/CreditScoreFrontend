import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcreditscoresComponent } from './allcreditscores.component';

describe('AllcreditscoresComponent', () => {
  let component: AllcreditscoresComponent;
  let fixture: ComponentFixture<AllcreditscoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllcreditscoresComponent]
    });
    fixture = TestBed.createComponent(AllcreditscoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
