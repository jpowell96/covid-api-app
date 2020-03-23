import React from "react";
import { CountrySummary } from "../responses";
import "./CountrySummaryCard.css";
interface CountrySummaryCardProps {
  summary: CountrySummary;
}

export const CountrySummaryCard = ({ summary }: CountrySummaryCardProps) => {
  //We'll display this data, and when you click on it, it'll Go to a CountryPage
  return (

      <div className="card">
        <div className="card__header">
          <h1>{summary.Country}</h1>
        </div>
        <div className="card__body">
          <p>Total Recovered: {summary.TotalRecovered}</p>
          <p>New Recovered: {summary.NewRecovered}</p>

          <p>New Confirmed: {summary.NewConfirmed}</p>
          <p>New Deaths: {summary.NewDeaths}</p>
        </div>
      </div>
  );
};
