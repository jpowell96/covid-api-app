export interface CountrySummary {
    Country: string;
    Slug: string;
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
}

export interface SummaryResponse {
    Countries : CountrySummary[];
    Date: string;
}