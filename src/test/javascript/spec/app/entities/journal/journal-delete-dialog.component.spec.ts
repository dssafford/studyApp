/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { StudyAppTestModule } from '../../../test.module';
import { JournalDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/journal/journal-delete-dialog.component';
import { JournalService } from '../../../../../../main/webapp/app/entities/journal/journal.service';

describe('Component Tests', () => {

    describe('Journal Management Delete Component', () => {
        let comp: JournalDeleteDialogComponent;
        let fixture: ComponentFixture<JournalDeleteDialogComponent>;
        let service: JournalService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StudyAppTestModule],
                declarations: [JournalDeleteDialogComponent],
                providers: [
                    JournalService
                ]
            })
            .overrideTemplate(JournalDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JournalDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JournalService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
