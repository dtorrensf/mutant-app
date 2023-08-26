import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UserInterface } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

import { UserDetailsPageComponent } from './user-details-page.component';

const user: UserInterface = {
  login: 'usuario1',
  id: '1',
  name: 'Nombre Usuario',
};

const usersServiceMock = {
  getUserById: () => of(user),
};

describe('UserDetailsPage.Component', () => {
  let component: UserDetailsPageComponent;
  let fixture: ComponentFixture<UserDetailsPageComponent>;
  let route: ActivatedRoute; // referencia del ActivatedRoute inyectado

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsPageComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsPageComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute); // instancia del ActivatedRoute inyectado
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should get the user without data', () => {
    const noDataUser: UserInterface = {
      login: '',
      name: '',
      id: '',
    };
    // Le asignamos el valor al param ID de la ruta
    route.snapshot.params['id'] = 'no_exist';

    // Definimos el comportamiento del servicio
    const service = TestBed.inject(UsersService);
    const serviceSpy = spyOn(service, 'getUserById').and.returnValue(
      of(noDataUser)
    );

    // Llamamos al método que deseamos probar
    component.ngOnInit();
    fixture.detectChanges();
    // Comprobamos que el usuario del componente sea nulo.
    expect(component.user).toEqual(null);

    // Comprobamos que el servicio ha sido invocado con el parámetro correcto
    expect(serviceSpy).toHaveBeenCalledWith('no_exist');
  });

  it('ngOnInit should get the user with id=usuario1', () => {
    // Le asignamos el valor al param ID de la ruta
    route.snapshot.params['id'] = 'usuario1';

    // Definimos el comportamiento del servicio
    const service = TestBed.inject(UsersService);
    const serviceSpy = spyOn(service, 'getUserById').and.callThrough();

    // Llamamos al método que deseamos probar
    component.ngOnInit();
    fixture.detectChanges();

    // Comprobamos que el usuario del componente sea igual al que devuelve el servicio
    expect(component.user).toEqual(user);

    // Comprobamos que el servicio ha sido invocado con el parámetro correcto
    expect(serviceSpy).toHaveBeenCalledWith('usuario1');
  });

  it('ngOnInit should not change user=null if id is not defined', () => {
    // Le asignamos el valor al param ID de la ruta
    route.snapshot.params['id'] = null;

    // Definimos el espía del servicio
    const service = TestBed.inject(UsersService);
    const serviceSpy = spyOn(service, 'getUserById');

    // Llamamos al método que deseamos probar
    component.ngOnInit();
    fixture.detectChanges();

    // Comprobamos que el usuario del componente sea nulo.
    expect(component.user).toEqual(null);

    // Comprobamos que el servicio nunca ha sido invocado
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  // it('isNotFound should return false if is loading', () => {
  //   component.loading = true;
  //   fixture.detectChanges();
  //   expect(component.isNotFound).toBeFalse();
  // });

  // it('isNotFound should return true if is not loading and no user', () => {
  //   component.user = null;
  //   fixture.detectChanges();
  //   expect(component.isNotFound).toBeTrue();
  // });

  afterEach(() => {
    fixture.destroy();
  });
});
