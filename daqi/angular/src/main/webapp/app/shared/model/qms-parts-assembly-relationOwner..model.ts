import { Moment } from 'moment';

export interface IQmsPartsAssemblyRelationOwner {
    id?: number;
    bomTechnologyId?: number;
    assemblyNum?: number;
    assemblyMaterielId?: number;
    assemblyMaterielCd?: string;
    assemblyMaterielName?: string;
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

export class QmsPartsAssemblyRelationOwner implements IQmsPartsAssemblyRelationOwner {
    constructor(
        public id?: number,
        public bomTechnologyId?: number,
        public assemblyNum?: number,
        public assemblyMaterielId?: number,
        public assemblyMaterielCd?: string,
        public assemblyMaterielName?: string,
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
