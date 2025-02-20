import { IBaseExt, IBasePagination, IPickSearch } from "../../../models";
export interface ICoCauToChuc extends IBaseExt {
    groupCode: string
    groupName: string
    ofGroupCode: string
    ofGroupName: string
    ofGroupId: string
    groupOrder: string
    active: string
    agent: string
    description: string
    type: string
}

export interface ISearchCoCauToChuc extends IBasePagination, IPickSearch<ICoCauToChuc, "groupCode" | "groupName" | "ofGroupCode" | "active"> {

}