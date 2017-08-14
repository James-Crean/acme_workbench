export class DataSet {
    name: string;
    metadata: string[];
    allowed_access: string[];
    file_list: string[];

    public constructor(init: any) {
        Object.assign(this, init);
    }
}
