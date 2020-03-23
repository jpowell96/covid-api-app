export type CaseStatus = "confirmed" | "recovered" | "deaths";

export enum CaseStatusEnum {
    Confirmed = "confirmed",
    Recovered = "recovered",
    Deaths = "deaths"
}

export interface CaseData {
    Country: string;
    Province: string;
    Lat: number;
    Lon: number;
    Date: string;
    Cases: number;
    Status: CaseStatus;
  }