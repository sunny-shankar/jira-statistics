import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const { VITE_BASE_URL } = import.meta.env;
      const config = {
        url: VITE_BASE_URL + "/jira",
        method: "POST",
      };
      const response = await axios(config);
      if (response.data.success === true) {
        console.log(response.data.data);
        setData(response.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return data ? (
    <div className=" w-screen h-screen flex items-center justify-center bg-slate-300">
      <div className="card w-auto bg-base-100 shadow-2xl">
        <div className="card-body">
          <h3 className="card-title">
            Issue Statistic: My Kanban Project (Assignee)
          </h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Assignee</th>
                  <th>Count</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td>Sunny Shankar</td>
                  <td>10</td>
                  <td>
                    <div className=" flex items-center justify-center">
                      <progress
                        className="progress progress-info w-40"
                        value="50"
                        max="100"
                      ></progress>
                      <span className=" font-semibold mx-2 mt-0">50 %</span>
                    </div>
                  </td> */}
                {/* </tr> */}
                {Object.entries(data).map(([key, value]) => (
                  <tr>
                    <td className=" capitalize font-medium">{key}</td>
                    <td>{value.count}</td>
                    <td>
                      {key != "total" ? (
                        <div className=" flex items-center justify-center">
                          <progress
                            className="progress progress-info w-40"
                            value={value.percentage}
                            max="100"
                          ></progress>

                          <span className=" font-semibold mx-2 mt-0">
                            {value.percentage} %
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className=" w-screen h-screen flex items-center justify-center bg-slate-300">
      <span className="loading loading-dots loading-lg  bg-blue-400"></span>
    </div>
  );
}

export default App;
