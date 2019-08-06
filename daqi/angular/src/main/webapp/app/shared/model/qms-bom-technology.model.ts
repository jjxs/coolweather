import { Moment } from 'moment';

export interface IQmsBomTechnology {
    id?: number;
    materielId?: number;
    technologyCd?: string;
    technologyName?: string;
    orderNo?: number;
    beforeProcessId?: number;
    processId?: number;
    organizationCd?: string;
    schedulerRole?: string;
    workUnit?: string;
    workHours?: number;
    qcType?: string;
    specialRole?: string;
    proprety?: string;
    machineCenterCd?: string;
    workCd?: string;
    deliverTime?: string;
    integerNum?: number;
    integerTimeUnit?: string;
    integerTime?: number;
    operationVersion?: string;
    workFactor?: number;
    operationType?: string;
    mutualinRole?: string;
    describe?: string;
    randomRole?: string;
    controlRole?: string;
    isMain?: string;
    isNewCd?: string;
    newCdMaterielId?: number;
    workGroupCd?: string;
    isControlPoint?: string;
    isTest?: string;
    isDefault?: string;
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

export class QmsBomTechnology implements IQmsBomTechnology {
    constructor(
        public id?: number,
        public materielId?: number,
        public technologyCd?: string,
        public technologyName?: string,
        public orderNo?: number,
        public beforeProcessId?: number,
        public processId?: number,
        public organizationCd?: string,
        public schedulerRole?: string,
        public workUnit?: string,
        public workHours?: number,
        public qcType?: string,
        public specialRole?: string,
        public proprety?: string,
        public machineCenterCd?: string,
        public workCd?: string,
        public deliverTime?: string,
        public integerNum?: number,
        public integerTimeUnit?: string,
        public integerTime?: number,
        public operationVersion?: string,
        public workFactor?: number,
        public operationType?: string,
        public mutualinRole?: string,
        public describe?: string,
        public randomRole?: string,
        public controlRole?: string,
        public isMain?: string,
        public isNewCd?: string,
        public newCdMaterielId?: number,
        public workGroupCd?: string,
        public isControlPoint?: string,
        public isTest?: string,
        public isDefault?: string,
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
