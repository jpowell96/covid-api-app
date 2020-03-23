import React, { useEffect, useState } from "react";
import { CaseStatusEnum, CaseData } from "./types";
import { CaseChart } from "./CaseChart";
import { useParams, useLocation, useHistory } from "react-router";


interface ParamTypes {
  countrySlug: string
}

interface LocationState {
  countryName: string
}

export const CountryPage = () => {
  let { countrySlug } = useParams<ParamTypes>();
  let  location = useLocation<LocationState>(); 
  const [confirmedCases, setConfirmedCases] = useState<CaseData[]>([]);
  const [deathCases, setDeathCases] = useState<CaseData[]>([]);
  const [recoveredCases, setRecoveredCases] = useState<CaseData[]>([]);
  let history = useHistory();

  function handleClick() {
    history.push("/");
  }
  
  useEffect(() => {
    async function getCountryCasesByType(
      countrySlug: string,
      caseStatus: CaseStatusEnum
    ): Promise<CaseData[]> {
      const countryCasesURL = `https://api.covid19api.com/dayone/country/${countrySlug}/status/${caseStatus}/live`;
      return fetch(countryCasesURL)
        .then((response: Response) => response.json())
        .then((cases: CaseData[]) => {
          return cases;
        });
    }
    
    getCountryCasesByType(countrySlug, CaseStatusEnum.Confirmed).then(
      (cases: CaseData[]) => {
        setConfirmedCases(cases);
      }
    );

    getCountryCasesByType(countrySlug, CaseStatusEnum.Deaths).then(
      (cases: CaseData[]) => {
        setDeathCases(cases);
      }
    );

    getCountryCasesByType(countrySlug, CaseStatusEnum.Recovered).then(
      (cases: CaseData[]) => {
        setRecoveredCases(cases);
      }
    );

    //No cleanup needed
    return function cleanup() {};
    //Data changes based on countrySlug so we include it in our dependency array
  }, [countrySlug]);


  return (
    <div>
      <h1>{
        (location && location.state) ? location.state.countryName : countrySlug.toUpperCase()
      }</h1>
      <button onClick={handleClick}>Back</button>
      <CaseChart
        title={"Confirmed"}
        data={confirmedCases}
        caseStatus={CaseStatusEnum.Confirmed}
      />
      <CaseChart
        title={"Deaths"}
        data={deathCases}
        caseStatus={CaseStatusEnum.Deaths}
      />
      <CaseChart
        title={"Recovered"}
        data={recoveredCases}
        caseStatus={CaseStatusEnum.Recovered}
      />
    </div>
  );
};
