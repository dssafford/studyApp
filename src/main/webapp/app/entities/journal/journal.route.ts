import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { JournalComponent } from './journal.component';
import { JournalDetailComponent } from './journal-detail.component';
import { JournalPopupComponent } from './journal-dialog.component';
import { JournalDeletePopupComponent } from './journal-delete-dialog.component';

@Injectable()
export class JournalResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const journalRoute: Routes = [
    {
        path: 'journal',
        component: JournalComponent,
        resolve: {
            'pagingParams': JournalResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Journals'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'journal/:id',
        component: JournalDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Journals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const journalPopupRoute: Routes = [
    {
        path: 'journal-new',
        component: JournalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Journals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'journal/:id/edit',
        component: JournalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Journals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'journal/:id/delete',
        component: JournalDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Journals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
