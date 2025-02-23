import { useEffect, useState } from "react";
import { Progress, Table, TableBody, TableCell, TableHead, TableRow } from "flowbite-react";
import { DisplayPortal } from "./display-portal.jsx";


function DisplayLogInfo(props) {
  const [error, setError] = useState(null);
  const [logDetails, setLogDetails] = useState({});
  const [isInfoLoaded, setInfoLoad] = useState(false);
  const [isApiDriven, setIsApiDriven] = useState(true);
  const [statusCode, setStatusCode] = useState();

  useEffect(() => {
    if (props.params.job_stts === 'FAILED' || props.params.job_stts === 'SCHEDULED_FAILED') {
      fetch(props.params.api_url)
        .then(processResponse)
        .then(res => {
            const {statusCode, data} = res;
            setStatusCode(statusCode);
            setLogDetails(data);
            setInfoLoad(true);
            setIsApiDriven(true);
          }
          , (error) => {
            setInfoLoad(true);
            setError(error);
          })
    } else {
      setIsApiDriven(false);
      setInfoLoad(true);
    }
  }, []);

  function processResponse(response) {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }

  if (error != null) {
    console.log('called null');
    return <div>Error: {error.message}</div>;
  } else if (!isApiDriven && isInfoLoaded) {
    return (<div>
      <Table style={{position: "relative", left: '333px', width: '50%'}}>
        <tbody style={{'border-collapse': 'collapse', width: "100%"}}>
        <tr>
          <th scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Application Code</th>
          <td style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.aplctn_cd}</td>
        </tr>
        <tr>
          <th scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Job Id</th>
          <td style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.job_id}</td>
        </tr>
        <tr>
          <th scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Job Name</th>
          <td style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.job_nm == null ? '' : props.params.job_nm}</td>
        </tr>
        <tr>
          <th scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Job Status</th>
          <td style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.job_stts}</td>
        </tr>
        <tr>
          <th scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Processsed Time</th>
          <td style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.processing_time}</td>
        </tr>
        </tbody>
      </Table>
      <div><span><h3 style={{'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Error Reason Description</h3><section
        style={{'whiteSpace': 'pre-line', 'background': '#b6d4f8', 'padding': '7px', 'fontSize': '12px', 'fontFamily': 'sans-serif'}}>{props.params.err_rsn_desc == null ? 'NA' : props.params.err_rsn_desc}</section></span></div>
      <div><span><h3 style={{'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Execution Log</h3><a href={props.params.err_log} target="_blank" rel="noopener noreferrer">{props.params.err_log}</a></span></div>
    </div>)
  } else if (isApiDriven) {
    if (!isInfoLoaded)
      return <Progress/>;
    else if (isInfoLoaded && statusCode == 200) {
      let jobLogUrl = logDetails["Job Log URL"].indexOf("http") == 0 ? logDetails["Job Log URL"] : '#';
      let setpJobUrl = logDetails["Step Log URL"].indexOf("http") == 0 ? logDetails["Step Log URL"] : '#';
      let targetJobUrl = logDetails["Target Ingest Job URL"].indexOf("http") == 0 ? logDetails["Target Ingest Job URL"] : '#';
      return (<div>
        <Table style={{position: "relative", left: '333px', width: '50%'}}>
          <TableBody style={{'border-collapse': 'collapse', width: "100%"}}>
            <TableRow>
              <TableHead scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Application Code</TableHead>
              <TableCell style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.aplctn_cd}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Job Id</TableHead>
              <td style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.job_id}</td>
            </TableRow>
            <TableRow>
              <TableHead scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Job Name</TableHead>
              <TableCell style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.job_nm == null ? '' : props.params.job_nm}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Job Status</TableHead>
              <TableCell style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.job_stts}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Processsed Time</TableHead>
              <TableCell style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.processing_time}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div><span><h3 style={{'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Job Error Description</h3><section style={{
          'whiteSpace': 'pre-line',
          'background': '#b6d4f8',
          'padding': '7px',
          'fontSize': '12px',
          'fontFamily': 'sans-serif'
        }}>{logDetails["Job Error Description"] == null ? 'NA' : logDetails["Job Error Description"]}</section></span></div>
        <div><span><h3 style={{'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Job Execution Log</h3><a href={jobLogUrl} target="_blank" rel="noopener noreferrer">{logDetails["Job Log URL"]}</a></span></div>
        <div><span><h3 style={{'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Glue Job Execution Log</h3><a href={targetJobUrl} target="_blank" rel="noopener noreferrer">{logDetails["Target Ingest Job URL"]}</a></span></div>
        <div><span><h3 style={{'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Step Error Description</h3><section style={{
          'whiteSpace': 'pre-line',
          'background': '#b6d4f8',
          'padding': '7px',
          'fontSize': '12px',
          'fontFamily': 'sans-serif'
        }}>{logDetails["Step Error Description"] == null ? 'NA' : logDetails["Step Error Description"]}</section></span></div>
        <div><span><h3 style={{'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Step Execution Log</h3><a href={setpJobUrl} target="_blank" rel="noopener noreferrer">{logDetails["Step Log URL"]}</a></span></div>
      </div>);
    } else if (isInfoLoaded && statusCode != 200) {
      return (<div>
        <Table>
          <TableBody style={{'border-collapse': 'collapse', width: "100%"}}>
            <TableRow>
              <TableHead scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>App Code</TableHead>
              <TableCell style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.aplctn_cd}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Job Id</TableHead>
              <TableCell style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.job_id}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Job Name</TableHead>
              <TableCell style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.job_nm == null ? '' : props.params.job_nm}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Job Status</TableHead>
              <TableCell style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.job_stts}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead scope="row" style={{'border': '1px solid #ddd', padding: "8px", 'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Processsed Time</TableHead>
              <TableCell style={{'border': '1px solid #ddd', padding: "8px"}}>{props.params.processing_time}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div><span><h3 style={{'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Error Reason Description</h3><section
          style={{'whiteSpace': 'pre-line', 'background': '#b6d4f8', 'padding': '7px', 'fontSize': '12px', 'fontFamily': 'sans-serif'}}>{props.params.err_rsn_desc == null ? 'NA' : props.params.err_rsn_desc}</section></span></div>
        <div><span><h3 style={{'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Execution Log</h3><a href={props.params.err_log} target="_blank" rel="noopener noreferrer">{props.params.err_log}</a></span></div>
        <div><span><h3 style={{'font-family': `"Gill Sans", sans-serif`, 'fontSize': '15px'}}>Server Error Message</h3><section
          style={{'whiteSpace': 'pre-line', 'background': '#b6d4f8', 'padding': '7px', 'fontSize': '12px', 'fontFamily': 'sans-serif'}}>{logDetails}</section></span></div>
      </div>)
    }
  }
}

function LogInfo(props) {
  return <DisplayPortal>
    <DisplayLogInfo params={props.data}>
    </DisplayLogInfo>
  </DisplayPortal>
}

export default LogInfo;

