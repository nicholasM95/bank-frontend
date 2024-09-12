import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTagDialogComponent } from './assign-tag-dialog.component';

describe('AssignTagDialogComponent', () => {
  let component: AssignTagDialogComponent;
  let fixture: ComponentFixture<AssignTagDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTagDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
