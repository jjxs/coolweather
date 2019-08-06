import { Moment } from 'moment';

export interface IQmsMateriel {
    id?: number;
    materielCd?: string;
    materielName?: string;
    figureNumber?: string;
    innerCd?: string;
    abcNumber?: string;
    productMode?: string;
    materielTypeId?: number;
    propertyType?: string;
    packgeUnitId?: number;
    useUnitId?: number;
    conversion?: number;
    specificationType?: string;
    weight?: number;
    density?: number;
    workHours?: number;
    taredHours?: number;
    schedulerRoleId?: number;
    organizationCd?: string;
    inHouseType?: string;
    vesselAmount?: number;
    qualityLevel?: string;
    texTure?: string;
    mhandlerRoleId?: number;
    eightPrevention?: string;
    ifKey?: string;
    ubiety?: string;
    sapCd?: string;
    isCheck?: string;
    checkType?: string;
    checkRate?: number;
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

export class QmsMateriel implements IQmsMateriel {
    constructor(
        public id?: number,
        public materielCd?: string,
        public materielName?: string,
        public figureNumber?: string,
        public innerCd?: string,
        public abcNumber?: string,
        public productMode?: string,
        public materielTypeId?: number,
        public propertyType?: string,
        public packgeUnitId?: number,
        public useUnitId?: number,
        public conversion?: number,
        public specificationType?: string,
        public weight?: number,
        public density?: number,
        public workHours?: number,
        public taredHours?: number,
        public schedulerRoleId?: number,
        public organizationCd?: string,
        public inHouseType?: string,
        public vesselAmount?: number,
        public qualityLevel?: string,
        public texTure?: string,
        public mhandlerRoleId?: number,
        public eightPrevention?: string,
        public ifKey?: string,
        public ubiety?: string,
        public sapCd?: string,
        public isCheck?: string,
        public checkType?: string,
        public checkRate?: number,
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
