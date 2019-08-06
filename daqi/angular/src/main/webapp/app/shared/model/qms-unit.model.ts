import { Moment } from 'moment';

export interface IQmsUnit {
    id?: number;
    unitCd?: string;
    unitName?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsUnit implements IQmsUnit {
    constructor(
        public id?: number,
        public unitCd?: string,
        public unitName?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
