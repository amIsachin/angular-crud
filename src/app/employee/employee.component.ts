import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'
import { EmployeeService } from '../Services/employee.service';
import { EmployeeEntity } from './EmployeeEntity';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  formValue!:FormGroup;
  EmployeeEnity: EmployeeEntity = new EmployeeEntity();
  EmployeeObject!:any;
  showUpdate!:boolean;
  showAdd!:boolean;
  constructor(private formBuilder: FormBuilder, private EmployeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      Name:[''],
      Age:[''],
      Salary:[''],
      City:['']
    })
    this.GetAllEmployee();
  }

  ClickShow(){
    this.showAdd=true;
    this.showUpdate=false;
    this.formValue.reset();
  }

  InsertEmployee(){
    this.EmployeeEnity.Name = this.formValue.value.Name;
    this.EmployeeEnity.Age = this.formValue.value.Age;
    this.EmployeeEnity.Salary = this.formValue.value.Salary;
    this.EmployeeEnity.City = this.formValue.value.City;

    this.EmployeeService.InsertStudent(this.EmployeeEnity).subscribe(response=>{
      alert('Employee has been Inserted successfully');
      this.GetAllEmployee();
      this.formValue.reset();
      let ref=document.getElementById('cancel');
      ref?.click();
    },
    error=>{
      alert('Oops something went wrong');
    })
  }

  GetAllEmployee(){
    this.EmployeeService.GetAllEmployees().subscribe(response=>{
      this.EmployeeObject = response;
    },
    error=>{
      alert('Oops something went wrong');
    })
  }

  OnEdit(employeeEntity: any){
    this.showAdd=false;
    this.showUpdate=true;
    this.EmployeeEnity.ID = employeeEntity.id;
    this.formValue.controls['Name'].setValue(employeeEntity.Name);
    this.formValue.controls['Age'].setValue(employeeEntity.Age);
    this.formValue.controls['Salary'].setValue(employeeEntity.Salary);
    this.formValue.controls['City'].setValue(employeeEntity.City);
  }

  UpdateEmployee(){
    this.EmployeeEnity.Name = this.formValue.value.Name;
    this.EmployeeEnity.Age = this.formValue.value.Age;
    this.EmployeeEnity.Salary = this.formValue.value.Salary;
    this.EmployeeEnity.City = this.formValue.value.City;

    this.EmployeeService.UpdateEmployee(this.EmployeeEnity.ID, this.EmployeeEnity).subscribe(response=>{
      alert('Record has been updated successfully');
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.GetAllEmployee();
    },
    error=>{
      alert('Oops something went wrong')
    })
  }

  DeleteEmployee(id:number){
    this.EmployeeService.DeleteEmployee(id).subscribe(response=>{
      alert('Employee Deleted successfully');
      this.GetAllEmployee();
    },
    error=>{
      alert('Oops something went wrong');
    })
  }

}
