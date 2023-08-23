import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UserInterface } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

import { UsersPageComponent } from './users-page.component';

// Clase para simular componente al que dirige la ruta
class RouteTestComponent {}

const users: UserInterface[] = [
  {
    login: 'usuario1',
    id: '1',
    name: 'Nombre usuario 1',
  },
  {
    login: 'usuario2',
    id: '2',
    name: 'Nombre usuario 2',
  },
];

const usersServiceMock = {
  getUsers: () => of(users),
};

describe('UsersPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersPageComponent],
      // Se utiliza RouterTestingModule en lugar del Router
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'user-details/:id', // Definimos la ruta que se necesita
            component: RouteTestComponent, // asignamos una clase Mock.
          },
        ]),
      ],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock, // Suplantamos el UsersService por el Mock
        },
      ], // Proveemos del servicio a la configuración de tests
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.usersList).toHaveSize(0);
  });

  it('trackByFn should return login value', () => {
    const user: UserInterface = {
      login: 'usuario 1',
      id: '1',
      name: 'Nombre Usuario',
    };
    const resp = component.trackByFn(1, user);
    expect(resp).toBe('usuario 1');
  });

  it('navigateTo should call routing service with correct params', () => {
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate').and.callThrough(); // ( 1 )

    component.usersList = [
      // ( 2 )
      {
        login: 'loginName',
        id: '1',
        name: 'Nombre usuario 1',
      },
    ];

    fixture.detectChanges(); // ( 3 )
    const params = 'user-details/loginName'; // ( 4 )
    const listItem: DebugElement = fixture.debugElement.query(By.css('li')); // ( 5 )
    expect(listItem).toBeTruthy(); // ( 6 )
    listItem.triggerEventHandler('click', null); // ( 7 )

    // se espera que se llame al servicio de routing con los parametros correctos.
    expect(routerSpy).toHaveBeenCalledWith([params]); // ( 8 )
  });

  it('ngOnInit should set usersList with service response', () => {
    component.ngOnInit();
    expect(component.usersList).toEqual(users);
  });
});
