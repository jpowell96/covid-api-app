import React from "react";
import { CountrySummary } from "../responses";
import "./CountrySummaryCard.css";
const {flag} = require("country-emoji");
interface CountrySummaryCardProps {
  summary: CountrySummary;
}

export const CountrySummaryCard = ({ summary }: CountrySummaryCardProps) => {
  return (

      <div className="card">
        <div className="card__header">
          <h1>{flag(summary.Country)}</h1>
          <h2>{summary.Country}</h2>

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
