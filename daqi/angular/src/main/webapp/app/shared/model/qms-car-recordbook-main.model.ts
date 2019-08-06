import { Moment } from 'moment';

export interface IQmsCarRecordbookMain {
    id?: number;
    recordbookSeq?: number;
    recordbookName?: string;
    recordbookNum?: number;
    recordbookCheck?: string;
    filecodepre?: string;
    editUser?: string;
    checkUser?: string;
    standardUser?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    reserveFirst?: string;
    reserveSecond?: string;
    reserveThird?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsCarRecordbookMain implements IQmsCarRecordbookMain {
    constructor(
        public id?: number,
        public recordbookSeq?: number,
        public recordbookName?: string,
        public recordbookNum?: number,
        public recordbookCheck?: string,
        public filecodepre?: string,
        public editUser?: string,
        public checkUser?: string,
        public standardUser?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public reserveFirst?: string,
        public reserveSecond?: string,
        public reserveThird?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
