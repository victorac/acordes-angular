import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySelectorComponent } from './key-selector.component';

describe('KeySelectorComponent', () => {
  let component: KeySelectorComponent;
  let fixture: ComponentFixture<KeySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeySelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
