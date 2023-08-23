import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

import { UserInterface } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

/**
 * UsersPageComponent
 */
@Component({
  selector: 'app-users',
  templateUrl: './users-page.component.html',
})
export class UsersPageComponent implements OnInit, OnDestroy {
  /**
   * Users list
   */
  usersList: UserInterface[] = [];

  /**
   * Subscrition reference
   */
  private subscription: Subscription | undefined | null;

  /**
   * Class constructor
   *
   * @param {Router} router the routing service
   * @param {UsersService} service the users service
   */
  constructor(private router: Router, private service: UsersService) {}

  ngOnInit(): void {
    this.subscription = this.service
      .getUsers()
      .pipe(take(1))
      .subscribe((users) => {
        this.usersList = users;
      });
  }

  navigateTo(url: string, id: string) {
    this.router.navigate([`${url}/${id}`]);
  }

  trackByFn(_index: number, item: UserInterface): string {
    return item.login;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
