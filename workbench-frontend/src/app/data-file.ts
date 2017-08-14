export class DataFile {
    id: number;
    path: string;
    display_name: string;
    owner: string;
    allowed_access: string[];
    data_type: number;

    public constructor(init: any) {
        Object.assign(this, init);
    }
}
