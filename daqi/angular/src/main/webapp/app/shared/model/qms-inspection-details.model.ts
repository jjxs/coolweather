import { Moment } from 'moment';

export interface IQmsInspectionDetails {
    id?: number;
    inspectionId?: number;
    inspectionDiff?: string;
    placeDiff?: string;
    testValue?: string;
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

export class QmsInspectionDetails implements IQmsInspectionDetails {
    constructor(
        public id?: number,
        public inspectionId?: number,
        public inspectionDiff?: string,
        public placeDiff?: string,
        public testValue?: string,
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
