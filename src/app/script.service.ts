import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Script } from "./model/script";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ScriptService {
    private baseUrl = 'http://localhost:8080/api/scripts';

    constructor(private http: HttpClient) {}

    findAll(): Observable<Script[]> {
        return this.http.get<Script[]>(this.baseUrl);
    }

    findById(id: number): Observable<Script> {
        return this.http.get<Script>(`${this.baseUrl}/${id}`);
    }

    save(script: Script): Observable<Script> {
        return this.http.post<Script>(this.baseUrl, script);
    }

    deleteById(id?: number): Observable<void> {
      if (id === undefined) {
        throw new Error("Invalid id");
      }
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    scheduleScript(script: Script): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/${script.id}/schedule`, null);
    }

    executeScript(scriptId?: number): Observable<void> {
        if (scriptId === undefined) {
          throw new Error("Invalid id");
        }
        return this.http.post<void>(`${this.baseUrl}/${scriptId}/execute`, null);
    }

    uploadScript(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<any>(`${this.baseUrl}/upload`, formData);
    }
}
