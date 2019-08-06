import { Moment } from 'moment';

export interface IQmsControlDetails {
    id?: number;
    inspectionCd?: string;
    inspectionItem?: string;
    technicalRequirement?: string;
    inspectionInstrument?: string;
    inspectionResultDiff?: string;
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

export class QmsControlDetails implements IQmsControlDetails {
    constructor(
        public id?: number,
        public inspectionCd?: string,
        public inspectionItem?: string,
        public technicalRequirement?: string,
        public inspectionInstrument?: string,
        public inspectionResultDiff?: string,
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
