import { IStudent } from "./istudent";

export interface IApiResponse {
    Data: IStudent[];
    Message: string;
    Success: boolean;
    IsAuthorized: boolean;
}
