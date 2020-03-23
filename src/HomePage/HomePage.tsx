import React, { useEffect, useState, ChangeEvent } from "react";
import { CountrySummary, SummaryResponse } from "./responses";
import { CountrySummaryCard } from "./CountrySummaryCard/CountrySummaryCard";
import "./HomePage.css";
import { Link } from "react-router-dom";
//Other stuff to add - Country Flag by the country so it's easy to recognize
//loading state so we don't have an empty screen
//cache responses in local storage so we don't need to make the call each time a user navigates back
interface HomePageProps {}

export const HomePage = (props: HomePageProps) => {
  const [countries, setCountries] = useState<CountrySummary[]>([]);
  const [asOfDate, setAsOfDate] = useState<string>("");
  const [filterText, setFilterText] = useState<string>("");
  useEffect(() => {
    async function fetchInitialData() {
      fetch("https://api.covid19api.com/summary")
        .then((response: Response) => response.json())
        .then((summaryResponse: SummaryResponse) => {
          setCountries(summaryResponse.Countries);
          setAsOfDate(summaryResponse.Date);
          console.log(summaryResponse.Date);
        });
    }

    fetchInitialData();

    //Cleanup Function for useEffect: Returning an empty function as there is no cleanup neccesary
    return function cleanup() {};

    //Our code in this array does not use anything from props, or from Router so our dependency array is empty
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const filteredCountries = countries.filter(summary =>
    summary.Country.toLowerCase().startsWith(filterText.toLowerCase())
  );
  //Also render your routes down here and place a link inside the CountrySummaryCard
  return (
    <>
      <h3>As Of Date: {asOfDate}</h3>
      <label htmlFor="Country Name Filter">Filter By Country Name:</label>
      <input
        type="text"
        name="Country Name Filter"
        onChange={handleInputChange}
      ></input>
      <div className="gridContainer">
        {filteredCountries.map(x => {
          return (
            <Link
              to={{
                pathname: `/country/${x.Slug}`,
                state: { countryName: x.Country }
              }}
              key={x.Slug}
            >
              <CountrySummaryCard key={x.Slug} summary={x} />
            </Link>
          );
        })}
      </div>
    </>
  );
};
