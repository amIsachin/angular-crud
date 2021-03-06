import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  InsertStudent(employeeEntity: any){
    return this.http.post<any>("http://localhost:3000/Employee",employeeEntity).pipe(map((response)=>{
      return response;
    }))
  }

  GetAllEmployees(){
    return this.http.get<any>("http://localhost:3000/Employee").pipe(map((response)=>{
      return response;
    }))
  }

  UpdateEmployee(id:number, employeeEntity: any){
    return this.http.put<any>("http://localhost:3000/Employee/"+id,employeeEntity).pipe(map((response)=>{
      return response;
    }))
  }

  DeleteEmployee(id:number){
    return this.http.delete<any>("http://localhost:3000/Employee/"+id).pipe(map((response)=>{
      return response;
    }))
  }
}
