import { Moment } from 'moment';

export interface IEntryControlDetailsInfo {
    id?: number;
    materielId?: number;
    materielName?: string;
    inspectionItem?: string;
    technicalRequirement?: string;
    inspectionInstrument?: string;
    numberCount?: string;
    placeDiff?: string;
    standard?: number;
    upperDeviation?: number;
    lowerDeviation?: number;
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

export class EntryControlDetailsInfo implements IEntryControlDetailsInfo {
    constructor(
        public id?: number,
        public materielId?: number,
        public materielName?: string,
        public inspectionItem?: string,
        public technicalRequirement?: string,
        public inspectionInstrument?: string,
        public numberCount?: string,
        public placeDiff?: string,
        public standard?: number,
        public upperDeviation?: number,
        public lowerDeviation?: number,
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
