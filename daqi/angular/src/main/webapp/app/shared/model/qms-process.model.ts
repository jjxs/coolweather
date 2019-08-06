import { Moment } from 'moment';

export interface IQmsProcess {
    id?: number;
    processCd?: string;
    processName?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsProcess implements IQmsProcess {
    constructor(
        public id?: number,
        public processCd?: string,
        public processName?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
