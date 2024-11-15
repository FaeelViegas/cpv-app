import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, take, throwError } from "rxjs";
import { environment } from "src/environments/environment";

export class CrudBase<T> {
    private urlAPI;
  
    constructor(protected http: HttpClient, private controllerAPI: string) {
      this.urlAPI = environment.urlAPI + controllerAPI;
    }
  
    list() {
      return this.http.get<T[]>(this.urlAPI).pipe(take(1));
    }
  
    loadById(id: number) {
      return this.http.get<T>(`${this.urlAPI}/GetById?id=${id}`).pipe(take(1));
    }
  
    getRecords(fieldSearch: string, text: string) {
      return this.http.get<T[]>(`${this.urlAPI}/GetRecords?fieldSearch=` + fieldSearch + "&text=" + text).pipe(take(1));
    }
  
    private create(record: T) {
      return this.http.post<T>(this.urlAPI, record).pipe(take(1), catchError(this.errorHandler));
    }
  
    private update(record: T) {
      return this.http.put<T>(`${this.urlAPI}`, record).pipe(take(1));
    }
  
    save(record: T, id: number) {
      if (id) {
        return this.update(record);
      }
      else {
        return this.create(record);
      }
  
    }
  
    remove(id: number) {
      return this.http.delete(`${this.urlAPI}/${id}`).pipe(take(1));
    }
  
  
    errorHandler(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }
  }
  