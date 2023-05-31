import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptFormComponent } from './script-form.component';

describe('ScriptFormComponent', () => {
  let component: ScriptFormComponent;
  let fixture: ComponentFixture<ScriptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScriptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScriptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
