import { IErrorStatusDef } from './IErrorStatusDef';

export default class ErrorMsgDef {
    public Status: IErrorStatusDef;
    public EndDt: string;

    constructor(status: IErrorStatusDef) {
        this.Status = status;
        this.EndDt = new Date().toISOString();
    }
}