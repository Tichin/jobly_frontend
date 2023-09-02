import React, { useState } from 'react';
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import JoblyApi from './api';
import { Link } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** Presentional Component
 * Display a list of companies and search form
 *
 * Prop: none
 *
 * State: companies : {
 *   data: [ { handle, name, description, numEmployees, logoUrl }, ...],
 *   isloading:true/false,
 * }
 *
 * RouteList -> CompanyList -> {CompanyCard, SearchForm}
 */

//TODO: done!
// make data === searchedJobs =>  state: {
//     data: null,
//     isLoading: true,
//  }

// maybe [error, setError]= useState(null)

function CompanyList() {

  const [companies, setCompanies] = useState({
    data: null,
    isLoading: true,
  });


  console.log("in CompanyList, companies= ", companies);

  async function fetchCompanies() {

    const fetchedCompanies = await JoblyApi.getCompanies();

    console.log("CompanyList in fetchCompanies, fetchedCompanies =", fetchedCompanies);

    setCompanies({
      isLoading: false,
      data: fetchedCompanies,
    });

  }

  async function searchFor(name) {

    const fetchedCompanies = await JoblyApi.getCompanies(name);

    setCompanies({
      isLoading: false,
      data: fetchedCompanies,
    });

  }

  if (companies.isLoading) {
    fetchCompanies();
    return <h1>Loading...</h1>;
  }
  //TODO: done!
  // const displayCompanies = companies.data.map(company =>
  //   <Link key={company.handle} to={`/companies/${company.handle}`}>
  //     <CompanyCard company={company} />
  //   </Link>);

  const displayCompanies = companies.data.map(({ handle, name, description, logoUrl }) =>
    <Link key={handle} to={`/companies/${handle}`}>
      <CompanyCard name={name} description={description} logoUrl={logoUrl} />
    </Link>);


  return (
    <div className="CompanyList">
      <SearchForm searchFor={searchFor} />
      {/* TODO:  done! */}
      {companies.data.length === 0
        ? <h1>Sorry, no results found</h1>
        : displayCompanies
      }

    </div>
  );
}

export default CompanyList;