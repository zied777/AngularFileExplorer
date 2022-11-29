
export class FileModel{

    constructor(public name:string, public type?:string,public children?:FileModel[]){}
}