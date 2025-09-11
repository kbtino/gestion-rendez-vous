import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRendezvousComponent } from './create-rendezvous.component';

describe('CreateRendezvousComponent', () => {
  let component: CreateRendezvousComponent;
  let fixture: ComponentFixture<CreateRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRendezvousComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
