import { Moment } from 'moment';

export interface IQmsPartsAssemblyRelation {
    id?: number;
    bomTechnologyId?: number;
    assemblyNum?: number;
    assemblyMaterielId?: number;
    assemblyCount?: number;
    remark?: string;
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

export class QmsPartsAssemblyRelation implements IQmsPartsAssemblyRelation {
    constructor(
        public id?: number,
        public bomTechnologyId?: number,
        public assemblyNum?: number,
        public assemblyMaterielId?: number,
        public assemblyCount?: number,
        public remark?: string,
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
