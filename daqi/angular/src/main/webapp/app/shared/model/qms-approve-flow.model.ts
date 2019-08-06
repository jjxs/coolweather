import { Moment } from 'moment';

export interface IQmsApproveFlow {
    id?: number;
    approveFlowCd?: string;
    stepNum?: number;
    stepDiff?: number;
    principalUserId?: number;
    controlLevel?: string;
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

export class QmsApproveFlow implements IQmsApproveFlow {
    constructor(
        public id?: number,
        public approveFlowCd?: string,
        public stepNum?: number,
        public stepDiff?: number,
        public principalUserId?: number,
        public controlLevel?: string,
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
