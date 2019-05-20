import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from './log';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  /**
   * Sends login post request to backend.
   * @param username
   * @param password
   */
  login(username: string, password: string): Observable<any> {
    return this.http.post<any> (
       'http://localhost:8080/user/login?username=' + username
       + "&password=" + password,
       undefined
    );
  }

  /**
   * Sends register account post request to backend.
   * @param name
   * @param username
   * @param password
   */
  register(name: string, username: string, password: string): Observable<any> {
    return this.http.post<any> (
       'http://localhost:8080/user/register?name=' + name + '&username=' + username
       + '&password=' + password,
       undefined
    );
  }

  /**
   * Adds a user to the backend.
   * @param name
   */
  addDiver(name: string): Observable<any> {
    return this.http.post<any>(
       'http://localhost:8080/user/addDiver?name=' + name,
       undefined
    );
  }

  /**
   * Returns all divers/users.
   */
  getAllDivers(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/user/allDivers', undefined);
  }

  /**
   * Returns all dives sites.
   */
  getAllSites(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/sites/all', undefined);
  }

  /**
   * Returns all dive logs.
   */
  getAllDives(): Observable<any> {
    // @ts-ignore
    return this.http.get(
       'http://localhost:8080/logs/getAll',
       undefined
    );
  }

  /**
   * Returns the dive logs for the specified diver.
   */
  getDiverLogs(diver: string): Observable<any> {
    return this.http.get(
       'http://localhost:8080/logs/?diver=' + diver,
       undefined
    );
  }

  /**
   * Adds a dive to the dive log.
   * @param diver name of the diver
   * @param site the dive site
   * @param timeIn the time the dive started
   * @param timeOut the time the dive ended
   */
  addDiveLog(diver: string, site: string, timeIn: string, timeOut: string): Observable<any> {
    return this.http.post<any> (
       'http://localhost:8080/logs/add?diverName=' + diver + '&siteName=' + site
       + '&timeIn=' + timeIn + '&timeOut=' + timeOut,
       undefined
    );
  }

  /**
   * Deletes the indicated dive log.
   * @param log log object to delete, has fields for diver, site, startTime and endTime
   */
  deleteDiveLog(log: Log): Observable<any> {
    return this.http.post<any> (
       'http://localhost:8080/logs/delete?diver=' + log.diver + '&id=' + log.id,
       undefined
    );
  }
}
