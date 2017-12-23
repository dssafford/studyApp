import { BaseEntity } from './../../shared';

export class Journal implements BaseEntity {
    constructor(
        public id?: number,
        public dateAdded?: any,
        public project?: string,
        public fileDirectory?: string,
        public machine?: string,
        public technology?: string,
        public version?: string,
        public comments?: string,
        public isActive?: boolean,
    ) {
        this.isActive = false;
    }
}
