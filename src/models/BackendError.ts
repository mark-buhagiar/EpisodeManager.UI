export default interface BackendError {
    type: string;
    title: string;
    status: number;
    detail: string;
    traceId: string;
}
