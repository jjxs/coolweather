import { Moment } from 'moment';

export interface IQmsEntryControlDetails {
    id?: number;
    materielId?: number;
    inspectionItem?: string;
    technicalRequirement?: string;
    inspectionInstrument?: string;
    standard?: number;
    upperDeviation?: number;
    lowerDeviation?: number;
    itemNumber?: number;
    inspectionResultDiff?: string;
    isValid?: string;
    loseTime?: Moment;
    isUse?: string;
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

export class QmsEntryControlDetails implements IQmsEntryControlDetails {
    constructor(
        public id?: number,
        public materielId?: number,
        public inspectionItem?: string,
        public technicalRequirement?: string,
        public inspectionInstrument?: string,
        public standard?: number,
        public upperDeviation?: number,
        public lowerDeviation?: number,
        public itemNumber?: number,
        public inspectionResultDiff?: string,
        public isValid?: string,
        public loseTime?: Moment,
        public isUse?: string,
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
