import React, { useState } from 'react';
import SearchForm from './SearchForm';
import JobCardList from './JobCardList';
import JoblyApi from './api';
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** Presentional Component
 * Display a list of jobs and a search form
 *
 * Prop: none
 *
 * State: jobs: {
 *  data: [ { id, title, salary, equity, companyHandle, companyName }, ...],
 *   isloading:true/false,
 *   searchedJobs: [ { id, title, salary, equity, companyHandle, companyName }, ...]
 *   errors: null
 *
 * }
 *
 * RouteList -> JobList -> {JobCardList, SearchForm}
 */

// TODO:
// make data === searchedJobs =>  state: {
//     data: null,
//     isLoading: true,
//  }

// maybe [error, setError]= useState(null)
//  error='...' || errors=[errors...]

function JobList() {

  const [jobs, setJobs] = useState({
    data: null,
    isLoading: true,
    searchedJobs: null,
    errors: null
  });

  console.log("in JobList, jobs= ", jobs);

  async function fetchJobs() {

    try {
      const fetchedJobs = await JoblyApi.getJobs();

      // console.log("JobList in fetchedJobs, fetchedJobs =", fetchedJobs);

      setJobs({
        isLoading: false,
        data: fetchedJobs,
        searchedJobs: null,
        errors: null
      });

    } catch (err) {

      setJobs({
        isLoading: false,
        data: null,
        searchedJobs: null,
        errors: err
      });
    }
  }


  async function searchFor(title) {

    try {
      const foundJobs = await JoblyApi.getJobs(title);
      console.log("in JobList, foundJobs =", foundJobs);
      setJobs({
        ...jobs,
        isLoading: false,
        searchedJobs: foundJobs,
        errors: null
      });

      // TODO: don't consider not-found as an error
      if (foundJobs.length === 0) {
        throw new Error('Sorry, no results were found!');
      }
    } catch (err) {

      setJobs({
        ...jobs,
        isLoading: false,
        searchedJobs: null,
        errors: err
      });
    }
  }

  if (jobs.isLoading) {
    fetchJobs();
    return <h1>Loading...</h1>;
  } else if (jobs.errors) {
    console.log('JobList error=', jobs.errors);
    return (
      <div>
        <SearchForm searchFor={searchFor} />
        <b> {jobs.errors.message}</b>
      </div>
    );
  }


  return (
    <div className="JobList">
      <SearchForm searchFor={searchFor} />

      {/* TODO: job.data.length === 0
           ?<h1> Not found</h1>
           : <JobCardList jobs={jobs.data} />
      */}
      {/* TODO:  delete the code below*/}
      {jobs.searchedJobs && jobs.searchedJobs.length !== 0
        ? <JobCardList jobs={jobs.searchedJobs} />
        : <JobCardList jobs={jobs.data} />
      }
    </div>
  );
}

export default JobList;