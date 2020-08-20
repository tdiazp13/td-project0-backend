export interface IErrorStatusDef {
    StatusCode: number;
    ServerStatusCode: string;
    Severity: 'Info' | 'Warning' | 'Error';
    StatusDesc: string;
}