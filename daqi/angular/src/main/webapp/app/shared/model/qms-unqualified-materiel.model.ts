import { Moment } from 'moment';

export interface IQmsUnqualifiedMateriel {
    id?: number;
    materielDetailsId?: number;
    bomTechnologyId?: number;
    processId?: number;
    discoverUserId?: number;
    discoverTime?: Moment;
    problemDescription?: string;
    dealWith?: string;
    useDiff?: string;
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

export class QmsUnqualifiedMateriel implements IQmsUnqualifiedMateriel {
    constructor(
        public id?: number,
        public materielDetailsId?: number,
        public bomTechnologyId?: number,
        public processId?: number,
        public discoverUserId?: number,
        public discoverTime?: Moment,
        public problemDescription?: string,
        public dealWith?: string,
        public useDiff?: string,
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
