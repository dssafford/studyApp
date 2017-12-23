/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { StudyAppTestModule } from '../../../test.module';
import { JournalDetailComponent } from '../../../../../../main/webapp/app/entities/journal/journal-detail.component';
import { JournalService } from '../../../../../../main/webapp/app/entities/journal/journal.service';
import { Journal } from '../../../../../../main/webapp/app/entities/journal/journal.model';

describe('Component Tests', () => {

    describe('Journal Management Detail Component', () => {
        let comp: JournalDetailComponent;
        let fixture: ComponentFixture<JournalDetailComponent>;
        let service: JournalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StudyAppTestModule],
                declarations: [JournalDetailComponent],
                providers: [
                    JournalService
                ]
            })
            .overrideTemplate(JournalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JournalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JournalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Journal(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.journal).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
