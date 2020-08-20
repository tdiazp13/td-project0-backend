import ErrorMsgDef from '../models/ErrorMsgDef';
import { IErrorStatusDef } from '../models/IErrorStatusDef';

export const debugErrorMsg = '[ERROR] : %0';

export class ErrorHandler {
    public static getErrorResponse(errorMsg: string, serverStatusCode: string, statusCode: number): ErrorMsgDef {
        const errorStatus: IErrorStatusDef = {
            ServerStatusCode: serverStatusCode,
            Severity: 'Error',
            StatusCode: statusCode,
            StatusDesc: errorMsg
        };
        return new ErrorMsgDef(errorStatus);
    }
}
