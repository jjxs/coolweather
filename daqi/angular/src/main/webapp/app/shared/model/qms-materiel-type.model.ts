import { Moment } from 'moment';

export interface IQmsMaterielType {
    id?: number;
    materielTypeCd?: string;
    materielTypeName?: string;
    parentCd?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsMaterielType implements IQmsMaterielType {
    constructor(
        public id?: number,
        public materielTypeCd?: string,
        public materielTypeName?: string,
        public parentCd?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
