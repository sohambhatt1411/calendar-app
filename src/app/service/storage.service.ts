import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Method to save data to localStorage
  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Method to get data from localStorage
  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Method to clear specific data
  clearData(key: string): void {
    localStorage.removeItem(key);
  }

  // Method to clear all data
  clearAllData(): void {
    localStorage.clear();
  }
  setAppointment(date: string, appointment: any): void {
    const existingAppointments = this.getData(date) || [];
    existingAppointments.push(appointment);
    this.setData(date, existingAppointments);
  }
  
  getAppointmentsByDate(date: string): any[] {
    return this.getData(date) || [];
  }
}
