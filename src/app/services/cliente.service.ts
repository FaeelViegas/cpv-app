import { Injectable } from "@angular/core";
import { CrudBase } from "./crudBase";
import { Cliente } from "../models/Cliente";
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class ClienteService extends CrudBase<Cliente> {
    constructor(protected override http: HttpClient) {
        super(http, "Cliente");
    }
}