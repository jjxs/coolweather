import { Moment } from 'moment';

export interface IQmsProcessInformations {
    id?: number;
    processCd?: number;
    orderNo?: string;
    processName?: string;
    numberCount?: string;
   
}

export class QmsProcessInformations implements IQmsProcessInformations {
    constructor(
        public id?: number,
        public processCd?: number,
        public orderNo?: string,
        public processName?: string,
        public numberCount?: string
  
    ) {}
}
