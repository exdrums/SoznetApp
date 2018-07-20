import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    // this resolver loaded user-data for MemberListComponent (waiting of async data)
    // returns an Observable of User or of null on error.
    // (example) with this we can replace {{user?.knownAs}} with {{user.knownAs}}
    // in the resolver only those data should be loaded, without which View should not be shown

    pageSize = 5;
    pageNumber = 1;

constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize)
            .pipe(
                catchError( error => {
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
    }
}
