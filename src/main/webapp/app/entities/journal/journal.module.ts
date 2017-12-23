import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StudyAppSharedModule } from '../../shared';
import {
    JournalService,
    JournalPopupService,
    JournalComponent,
    JournalDetailComponent,
    JournalDialogComponent,
    JournalPopupComponent,
    JournalDeletePopupComponent,
    JournalDeleteDialogComponent,
    journalRoute,
    journalPopupRoute,
    JournalResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...journalRoute,
    ...journalPopupRoute,
];

@NgModule({
    imports: [
        StudyAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JournalComponent,
        JournalDetailComponent,
        JournalDialogComponent,
        JournalDeleteDialogComponent,
        JournalPopupComponent,
        JournalDeletePopupComponent,
    ],
    entryComponents: [
        JournalComponent,
        JournalDialogComponent,
        JournalPopupComponent,
        JournalDeleteDialogComponent,
        JournalDeletePopupComponent,
    ],
    providers: [
        JournalService,
        JournalPopupService,
        JournalResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudyAppJournalModule {}
