/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { StudyAppTestModule } from '../../../test.module';
import { JournalComponent } from '../../../../../../main/webapp/app/entities/journal/journal.component';
import { JournalService } from '../../../../../../main/webapp/app/entities/journal/journal.service';
import { Journal } from '../../../../../../main/webapp/app/entities/journal/journal.model';

describe('Component Tests', () => {

    describe('Journal Management Component', () => {
        let comp: JournalComponent;
        let fixture: ComponentFixture<JournalComponent>;
        let service: JournalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StudyAppTestModule],
                declarations: [JournalComponent],
                providers: [
                    JournalService
                ]
            })
            .overrideTemplate(JournalComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JournalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JournalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Journal(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.journals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
