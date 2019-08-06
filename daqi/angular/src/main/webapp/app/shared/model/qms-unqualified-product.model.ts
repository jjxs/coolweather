import { Moment } from 'moment';

export interface IQmsUnqualifiedProduct {
    id?: number;
    inspectionValueId?: number;
    bomTechnologyId?: number;
    processId?: number;
    materielId?: number;
    approveResultId?: number;
    unhealthyId?: number;
    defectId?: number;
    controlLevel?: string;
    approvePrincipalUserId?: number;
    approveStepNum?: number;
    approveStepUserId?: number;
    seriNumber?: string;
    furnace?: string;
    saleNumber?: string;
    productorderNumber?: string;
    inspectionDiff?: string;
    isApprove?: string;
    approveResultDiff?: string;
    approveUserId?: number;
    approveTime?: Moment;
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

export class QmsUnqualifiedProduct implements IQmsUnqualifiedProduct {
    constructor(
        public id?: number,
        public inspectionValueId?: number,
        public bomTechnologyId?: number,
        public processId?: number,
        public materielId?: number,
        public approveResultId?: number,
        public unhealthyId?: number,
        public defectId?: number,
        public controlLevel?: string,
        public approvePrincipalUserId?: number,
        public approveStepNum?: number,
        public approveStepUserId?: number,
        public seriNumber?: string,
        public furnace?: string,
        public saleNumber?: string,
        public productorderNumber?: string,
        public inspectionDiff?: string,
        public isApprove?: string,
        public approveResultDiff?: string,
        public approveUserId?: number,
        public approveTime?: Moment,
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
