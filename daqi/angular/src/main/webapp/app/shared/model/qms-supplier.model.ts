import { Moment } from 'moment';

export interface IQmsSupplier {
    id?: number;
    supplierClassId?: number;
    supplierCd?: string;
    supplierName?: string;
    address?: string;
    telNum1?: string;
    telNum2?: string;
    faxNum?: string;
    urlAddress?: string;
    mailAddress?: string;
    linkMan?: string;
    department?: string;
    assRecord?: string;
    flagStatus?: string;
    compPkid?: string;
    remark?: string;
    makeUser?: string;
    makeTime?: Moment;
    modifyUser?: string;
    modifyTime?: Moment;
}

export class QmsSupplier implements IQmsSupplier {
    constructor(
        public id?: number,
        public supplierClassId?: number,
        public supplierCd?: string,
        public supplierName?: string,
        public address?: string,
        public telNum1?: string,
        public telNum2?: string,
        public faxNum?: string,
        public urlAddress?: string,
        public mailAddress?: string,
        public linkMan?: string,
        public department?: string,
        public assRecord?: string,
        public flagStatus?: string,
        public compPkid?: string,
        public remark?: string,
        public makeUser?: string,
        public makeTime?: Moment,
        public modifyUser?: string,
        public modifyTime?: Moment
    ) {}
}
