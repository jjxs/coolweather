import { Moment } from 'moment';

export interface IProcessInfomations {
    id?: number;
    bomTechnologyId?: number;
    inspectionItem?: string;
    technicalRequirement?: string;
    inspectionInstrument?: string;
    placeDiff?: string;
    standard?: number;
    upperDeviation?: number;
    lowerDeviation?: number;
    inspectionResultDiff?: string;
    inspectionResultDiffName?: string;
    remark?: string;
    inspectionType?: boolean;
    isCheckObj?: string;
    abcType?: string;
    abcTypeName?: string;
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

export class ProcessInfomations implements IProcessInfomations {
    constructor(
        public id?: number,
        public bomTechnologyId?: number,
        public inspectionItem?: string,
        public technicalRequirement?: string,
        public inspectionInstrument?: string,
        public placeDiff?: string,
        public standard?: number,
        public upperDeviation?: number,
        public lowerDeviation?: number,
        public inspectionResultDiff?: string,
        public inspectionResultDiffName?: string,
        public remark?: string,
        public inspectionType?: boolean,
        public isCheckObj?: string,
        public abcType?: string,
        public abcTypeName?: string,
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
