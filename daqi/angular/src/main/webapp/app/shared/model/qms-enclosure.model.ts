import { Moment } from 'moment';

export interface IQmsEnclosure {
    id?: number;
    inspectionInfoId?: number;
    inspectionKbn?: string;
    enclosureAddress?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsEnclosure implements IQmsEnclosure {
    constructor(
        public id?: number,
        public inspectionInfoId?: number,
        public inspectionKbn?: string,
        public enclosureAddress?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
