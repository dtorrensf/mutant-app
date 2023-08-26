import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserInterface } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

/**
 * UserDetailsPageComponent
 */
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details-page.component.html',
})
export class UserDetailsPageComponent implements OnInit, OnDestroy {
  user: UserInterface | null = null;

  get isNotFound(): boolean {
    return !this.user && !this.loading;
  }

  loading: boolean = false;

  subscription: Subscription | null = null;
  /**
   * Class constructor
   *
   * @param {ActivatedRoute} activeRoute the active route
   * @param {UsersService} service the user service
   */
  constructor(
    private activeRoute: ActivatedRoute,
    private service: UsersService
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params['id'];
    this.getUserWithId(id);
  }

  private getUserWithId(id: string): void {
    if (id) {
      this.loading = true;
      this.subscription = this.service.getUserById(id).subscribe((resp) => {
        this.loading = false;
        if (resp.login !== '') {
          this.user = resp;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
