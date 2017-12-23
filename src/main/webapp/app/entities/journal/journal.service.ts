import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Journal } from './journal.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class JournalService {

    private resourceUrl = SERVER_API_URL + 'api/journals';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(journal: Journal): Observable<Journal> {
        const copy = this.convert(journal);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(journal: Journal): Observable<Journal> {
        const copy = this.convert(journal);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Journal> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Journal.
     */
    private convertItemFromServer(json: any): Journal {
        const entity: Journal = Object.assign(new Journal(), json);
        entity.dateAdded = this.dateUtils
            .convertDateTimeFromServer(json.dateAdded);
        return entity;
    }

    /**
     * Convert a Journal to a JSON which can be sent to the server.
     */
    private convert(journal: Journal): Journal {
        const copy: Journal = Object.assign({}, journal);

        copy.dateAdded = this.dateUtils.toDate(journal.dateAdded);
        return copy;
    }
}
