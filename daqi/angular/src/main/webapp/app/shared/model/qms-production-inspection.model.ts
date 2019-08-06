import { Moment } from 'moment';

export interface IQmsProductionInspection {
    id?: number;
    bomTechnologyId?: number;
    materielId?: number;
    serialNumber?: string;
    furnace?: string;
    workno?: string;
    saleNumber?: string;
    productorderNumber?: string;
    productId?: number;
    finishNumber?: number;
    quailfiedNumber?: number;
    deffectiveNumber?: number;
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

export class QmsProductionInspection implements IQmsProductionInspection {
    constructor(
        public id?: number,
        public bomTechnologyId?: number,
        public materielId?: number,
        public serialNumber?: string,
        public furnace?: string,
        public workno?: string,
        public saleNumber?: string,
        public productorderNumber?: string,
        public productId?: number,
        public finishNumber?: number,
        public quailfiedNumber?: number,
        public deffectiveNumber?: number,
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
