import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterService } from '../../../../core/services/auth/RegisterService';
import { Register } from './register';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        {
          provide: RegisterService,
          useValue: {
            AddUser: () => ({ subscribe: () => {} }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract API error messages', () => {
    const messages = component['extractServerErrors']({
      error: {
        errors: {
          EmailAlreadyExist: ['Email already exist'],
        },
      },
    });

    expect(messages).toEqual(['Email already exist']);
  });
});
