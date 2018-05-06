import { Injectable } from "@angular/core";
import { Api } from "../providers/api/api";

@Injectable()
export class AppService {
    constructor(private api: Api) {

    }

    public getInit() {
        return this.api.httpGet('GetInit').toPromise();
    }

}