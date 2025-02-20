import { IBaseExt, IBasePagination, IPickSearch } from "../../../models";
export interface IUser extends IBaseExt {
    firstName: string,
    lastName: string,
    fullName: string,
    userName: string
    groupCode: string,
    groupName: string,
    positionCode: string,
    userOrder: string,
    isSystemAccount: string,
}

export interface ISearchUser extends IBasePagination, IPickSearch<IUser, "fullName" | "groupCode"> {
    isActive?: boolean,
    orderBy?: string[]
}