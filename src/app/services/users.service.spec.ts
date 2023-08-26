import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserInterface } from '../interfaces/user.interface';

import { UsersService } from './users.service';

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

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController; // Mock del control http

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController); // Obtenemos el mock de HttpClient inyectado en el servicio
  });

  afterEach(() => {
    httpMock.verify(); // verificamos y cerramos las llamadas al finalizar cada test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers should return a list of users', () => {
    service.getUsers().subscribe(
      (
        resp: UserInterface[] // nos suscribimos al método
      ) => expect(resp).toEqual(users) // comprobamos la respuesta esperada
    );

    const req = httpMock.expectOne('https://api.github.com/users'); // comprobamos que se realiza la llamada al url y obtenemos el request
    expect(req.request.method).toBe('GET');
    req.flush(users); // simulamos la respuesta.
  });

  it('getUserById should call http service with users/login url', () => {
    service.getUserById('usuario1').subscribe((user: UserInterface) => {
      expect(user).toEqual(users[0]);
    });

    // se comprueba que el request de la llamada http sea con la url correcta
    const req = httpMock.expectOne('https://api.github.com/users/usuario1');

    // se comprueba que el request de la llamada http sea de tipo GET y no otro
    expect(req.request.method).toBe('GET');

    // Mock de la respuesta http.
    req.flush(users[0]);
  });

  it('getUserById should catchError for wrong request', () => {
    const emptyUser: UserInterface = {
      login: '',
      id: '',
      name: '',
    };
    service.getUserById('non_existing').subscribe((user: UserInterface) => {
      expect(user).toEqual(emptyUser);
    });

    // se comprueba que el request de la llamada http sea con la url correcta
    const req = httpMock.expectOne('https://api.github.com/users/non_existing');

    // se comprueba que el request de la llamada http sea de tipo GET y no otro
    expect(req.request.method).toBe('GET');

    // Mock de la respuesta http.
    req.error(new ProgressEvent('someError'));
  });
});
