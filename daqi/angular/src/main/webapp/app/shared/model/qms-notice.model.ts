import { Moment } from 'moment';

export interface IQmsNotice {
    id?: number;
    noticeType?: string;
    noticeRole?: string;
    noticeUser?: string;
    noticeInfo?: string;
    readFlag?: string;
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

export class QmsNotice implements IQmsNotice {
    constructor(
        public id?: number,
        public noticeType?: string,
        public noticeRole?: string,
        public noticeUser?: string,
        public noticeInfo?: string,
        public readFlag?: string,
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
