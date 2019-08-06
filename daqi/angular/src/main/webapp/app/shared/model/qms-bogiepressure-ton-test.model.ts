import { Moment } from 'moment';

export interface IQmsBogiepressureTonTest {
    id?: number;
    pkid?: string;
    productdate?: string;
    checker?: string;
    checkdate?: string;
    x1?: string;
    y1?: string;
    z1?: string;
    v1?: string;
    a1?: string;
    x2?: string;
    y2?: string;
    z2?: string;
    v2?: string;
    a2?: string;
    judge?: string;
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

export class QmsBogiepressureTonTest implements IQmsBogiepressureTonTest {
    constructor(
        public id?: number,
        public pkid?: string,
        public productdate?: string,
        public checker?: string,
        public checkdate?: string,
        public x1?: string,
        public y1?: string,
        public z1?: string,
        public v1?: string,
        public a1?: string,
        public x2?: string,
        public y2?: string,
        public z2?: string,
        public v2?: string,
        public a2?: string,
        public judge?: string,
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
