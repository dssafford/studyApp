/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { StudyAppTestModule } from '../../../test.module';
import { JournalDialogComponent } from '../../../../../../main/webapp/app/entities/journal/journal-dialog.component';
import { JournalService } from '../../../../../../main/webapp/app/entities/journal/journal.service';
import { Journal } from '../../../../../../main/webapp/app/entities/journal/journal.model';

describe('Component Tests', () => {

    describe('Journal Management Dialog Component', () => {
        let comp: JournalDialogComponent;
        let fixture: ComponentFixture<JournalDialogComponent>;
        let service: JournalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StudyAppTestModule],
                declarations: [JournalDialogComponent],
                providers: [
                    JournalService
                ]
            })
            .overrideTemplate(JournalDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JournalDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JournalService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Journal(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.journal = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'journalListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Journal();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.journal = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'journalListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
