import { Moment } from 'moment';

export interface IQmsEntryInspectionResult {
    id?: number;
    entryControlDetailId?: number;
    goodsCd?: string;
    controlId?: number;
    placeDiff?: string;
    testValue?: string;
    recordNum?: number;
    checkResult?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    groupCd?: string;
    reserveFirst?: string;
    reserveSecond?: string;
    reserveThird?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsEntryInspectionResult implements IQmsEntryInspectionResult {
    constructor(
        public id?: number,
        public entryControlDetailId?: number,
        public goodsCd?: string,
        public controlId?: number,
        public placeDiff?: string,
        public testValue?: string,
        public recordNum?: number,
        public checkResult?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public groupCd?: string,
        public reserveFirst?: string,
        public reserveSecond?: string,
        public reserveThird?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
