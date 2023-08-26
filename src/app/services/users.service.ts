import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { UserInterface } from '../interfaces/user.interface';

/**
 * UsersService
 */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://api.github.com';
  private emptyUser: UserInterface = { login: '', id: '', name: '' };

  /**
   * Class constructor
   *
   * @param {HttpClient} http the http client service
   */
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserInterface[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<UserInterface[]>(url);
  }

  getUserById(id: string): Observable<UserInterface> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http
      .get<UserInterface>(url)
      .pipe(catchError(() => of(this.emptyUser)));
  }
}
