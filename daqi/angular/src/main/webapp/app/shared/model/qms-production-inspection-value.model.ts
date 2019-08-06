import { Moment } from 'moment';

export interface IQmsProductionInspectionValue {
    id?: number;
    inspectionId?: number;
    checkNumber?: string;
    inspectionDiff?: string;
    isOk?: string;
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

export class QmsProductionInspectionValue implements IQmsProductionInspectionValue {
    constructor(
        public id?: number,
        public inspectionId?: number,
        public checkNumber?: string,
        public inspectionDiff?: string,
        public isOk?: string,
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
