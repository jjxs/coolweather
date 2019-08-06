import { Moment } from 'moment';

export interface IQmsProductionTask {
    id?: number;
    bomTechnologyId?: number;
    materielId?: number;
    serialNumber?: string;
    furnace?: string;
    saleNumber?: string;
    productorderNumber?: string;
    finishNumber?: number;
    quailfiedNumber?: number;
    deffectiveNumber?: number;
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

export class QmsProductionTask implements IQmsProductionTask {
    constructor(
        public id?: number,
        public bomTechnologyId?: number,
        public materielId?: number,
        public serialNumber?: string,
        public furnace?: string,
        public saleNumber?: string,
        public productorderNumber?: string,
        public finishNumber?: number,
        public quailfiedNumber?: number,
        public deffectiveNumber?: number,
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
