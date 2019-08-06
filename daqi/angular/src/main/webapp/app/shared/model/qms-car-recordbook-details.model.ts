import { Moment } from 'moment';

export interface IQmsCarRecordbookDetails {
    id?: number;
    recordbookMainId?: number;
    productId?: number;
    assemblyCd?: string;
    fileupload?: string;
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

export class QmsCarRecordbookDetails implements IQmsCarRecordbookDetails {
    constructor(
        public id?: number,
        public recordbookMainId?: number,
        public productId?: number,
        public assemblyCd?: string,
        public fileupload?: string,
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
