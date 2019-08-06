import { Moment } from 'moment';

export interface IQmsApproveResult {
    id?: number;
    approveFlowId?: number;
    unqualifiedProductId?: number;
    stepNum?: number;
    principalUserId?: number;
    approveTime?: Moment;
    approveResult?: string;
    approveStatus?: string;
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

export class QmsApproveResult implements IQmsApproveResult {
    constructor(
        public id?: number,
        public approveFlowId?: number,
        public unqualifiedProductId?: number,
        public stepNum?: number,
        public principalUserId?: number,
        public approveTime?: Moment,
        public approveResult?: string,
        public approveStatus?: string,
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
