import { Moment } from 'moment';

export interface IQmsMicSwicthRegulattoTest {
    id?: number;
    sname?: string;
    stype?: string;
    scode?: string;
    ddate?: string;
    il0?: string;
    izdgS?: string;
    sworker?: string;
    ssumup?: string;
    sneworold?: string;
    idian?: string;
    izdg0?: string;
    izdg1?: string;
    izdg2?: string;
    izdg3?: string;
    izdg4?: string;
    izdg5?: string;
    izdg6?: string;
    izdg7?: string;
    iztq0?: string;
    iztq1?: string;
    iztq2?: string;
    iztq3?: string;
    iztq4?: string;
    iztq5?: string;
    iztq6?: string;
    iztq7?: string;
    iztq8?: string;
    iztq9?: string;
    iztq10?: string;
    iztq11?: string;
    iqdl?: string;
    sresult0?: string;
    sresult1?: string;
    sresult2?: string;
    sresult3?: string;
    sresult4?: string;
    sresult5?: string;
    sresult6?: string;
    sresult?: string;
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

export class QmsMicSwicthRegulattoTest implements IQmsMicSwicthRegulattoTest {
    constructor(
        public id?: number,
        public sname?: string,
        public stype?: string,
        public scode?: string,
        public ddate?: string,
        public il0?: string,
        public izdgS?: string,
        public sworker?: string,
        public ssumup?: string,
        public sneworold?: string,
        public idian?: string,
        public izdg0?: string,
        public izdg1?: string,
        public izdg2?: string,
        public izdg3?: string,
        public izdg4?: string,
        public izdg5?: string,
        public izdg6?: string,
        public izdg7?: string,
        public iztq0?: string,
        public iztq1?: string,
        public iztq2?: string,
        public iztq3?: string,
        public iztq4?: string,
        public iztq5?: string,
        public iztq6?: string,
        public iztq7?: string,
        public iztq8?: string,
        public iztq9?: string,
        public iztq10?: string,
        public iztq11?: string,
        public iqdl?: string,
        public sresult0?: string,
        public sresult1?: string,
        public sresult2?: string,
        public sresult3?: string,
        public sresult4?: string,
        public sresult5?: string,
        public sresult6?: string,
        public sresult?: string,
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
