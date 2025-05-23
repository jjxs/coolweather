import { Moment } from 'moment';

export interface IQmsUnqualifiedProductDetails {
    id?: number;
    unqualifiedProductId?: number;
    inspectionItem?: string;
    technicalRequirement?: string;
    inspectionInstrument?: string;
    standard?: number;
    upperDeviation?: number;
    lowerDeviation?: number;
    controlLevel?: string;
    checkResult?: string;
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

export class QmsUnqualifiedProductDetails implements IQmsUnqualifiedProductDetails {
    constructor(
        public id?: number,
        public unqualifiedProductId?: number,
        public inspectionItem?: string,
        public technicalRequirement?: string,
        public inspectionInstrument?: string,
        public standard?: number,
        public upperDeviation?: number,
        public lowerDeviation?: number,
        public controlLevel?: string,
        public checkResult?: string,
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
