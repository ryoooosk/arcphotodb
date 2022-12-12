import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpictureComponent } from './userpicture.component';

describe('UserpictureComponent', () => {
  let component: UserpictureComponent;
  let fixture: ComponentFixture<UserpictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpictureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserpictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
