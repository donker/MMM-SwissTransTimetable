import React, { useEffect, useRef, useState } from "react";
import { Connection, StationBoardData } from "../Models/DataModel";
import Entry from "./Entry";

interface AppProps {
  stationName: string;
  limit: number;
  departure: boolean;
}

const App: React.FC<AppProps> = (props) => {
  const [counter, setCounter] = useState(0);
  const [board, setBoard] = useState<Connection[]>([]);
  const url = encodeURI(
    `https://timetable.search.ch/api/stationboard.json?show_tracks=true&show_delays=true&stop=${
      props.stationName
    }&limit=${props.limit}&mode=${props.departure ? "depart" : "arrival"}`
  );

  useEffect(() => {
    getData();
    var timer = setInterval(() => {
      setCounter(counter + 1);
      getData();
    }, 120000);
  });

  const getData = () => {
    fetch(url)
      .then(async (response) => {
        if (response.ok) {
          const results: StationBoardData = await response.json();
          setBoard(results.connections);
        }
      })
      .catch((err) => {
        // do nothing
      });
  };

  return (
    <div>
      <table>
        <tbody>
          {board.map((b) => (
            <Entry connection={b} departure={props.departure} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
