import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    // (endpoint) => (endpoint, undefined, undefined)
    // (endpoint) => (endpoint, {}, "delete")
    // (endpoint) => (data={...}, method="post")
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};
    //  axios(url, 'get', data, params=data, headers)
    //  axios(url, 'post', data=data, params={}, headers)
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~ Companies ~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** Get details on a company by handle.
   *
   *  Takes a company handle : 'Davis-Davis'
   *
   *  Returns an object of company
   *  Company is { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
  */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on all companies.
   *
   *  Returns a list of companies
   *
   * { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
  */
  static async getCompanies() {
    let res = await this.request("companies/");
    return res.companies;
  }

  /** Create a company.
   *
   *  Takes an object of company
   *  {
        handle: "new",
        name: "New",
        description: "test New Description",
        numEmployees: 5,
        logoUrl: "http://new.img"
      }

     Returns an object of created company
     { handle, name, description, numEmployees, logoUrl }
   *
   *
  */
  static async createCompany(company) {
    let res = await this.request(`companies/`, company, "post");
    return res.company;
  }

  /** Remove a company
   *  Takes a company handle
   *  Returns { deleted: handle }
  */
  static async removeCompany(handle) {
    let res = await this.request(`companies/${handle}`, {}, 'delete');
    // let res = await this.request(url = `companies/${handle}`, method = 'delete');
    return res.deleted;
  }

  /** Edit a company
  *
  *  Takes fields of a company
  *  fields can be: { name, description, numEmployees, logo_url }
  *
  *  Returns { handle, name, description, numEmployees, logo_url }
  */

  static async editCompany(handle, fields) {
    let res = await this.request(`companies/${handle}`, fields, "patch");
    return res.company;
  }


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~Jobs ~~~~~~~~~~~~~~~~~~~~~~~~~//

  //create jobs
}