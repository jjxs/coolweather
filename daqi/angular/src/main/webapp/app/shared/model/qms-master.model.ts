import { Moment } from 'moment';

export interface IQmsMaster {
    id?: number;
    kbnCd?: string;
    kbnName?: string;
    prjCd?: string;
    prjName?: string;
    remark?: string;
    flagStatus?: string;
    compPkid?: string;
    reserveFirst?: string;
    reserveSecond?: string;
    reserveThird?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsMaster implements IQmsMaster {
    constructor(
        public id?: number,
        public kbnCd?: string,
        public kbnName?: string,
        public prjCd?: string,
        public prjName?: string,
        public remark?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public reserveFirst?: string,
        public reserveSecond?: string,
        public reserveThird?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
