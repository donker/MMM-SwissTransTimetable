import { Component } from "react";
import { Connection, StationBoardData } from "../Models/DataModel";
import Entry from "./Entry";

interface ITimetableProps {
  stationName: string;
  limit: number;
  departure: boolean;
}

interface ITimetableState {
  counter: number;
  timer: NodeJS.Timeout | null;
  connections: Connection[];
}

export default class Timetable extends Component<
  ITimetableProps,
  ITimetableState
> {
  constructor(props: ITimetableProps) {
    super(props);
    this.state = {
      counter: 0,
      timer: null,
      connections: []
    };
  }

  componentDidMount() {
    this.getData();
    if (this.state.timer === null) {
      var timer = setInterval(() => {
        this.setState({ counter: this.state.counter + 1 });
        this.getData();
      }, 120000);
      this.setState({ timer: timer });
    }
  }

  getData() {
    const url = encodeURI(
      `https://timetable.search.ch/api/stationboard.json?show_tracks=true&show_delays=true&stop=${
        this.props.stationName
      }&limit=${this.props.limit}&mode=${
        this.props.departure ? "depart" : "arrival"
      }`
    );
    console.log("Getting data transport timetable");
    fetch(url)
      .then(async (response) => {
        if (response.ok) {
          const results: StationBoardData = await response.json();
          this.setState({ connections: results.connections });
        }
      })
      .catch((err) => {
        console.log(err);
        // do nothing
      });
  }

  public render(): JSX.Element {
    return (
      <div>
        <table>
          <tbody>
            {this.state.connections.map((b) => (
              <Entry
                connection={b}
                departure={this.props.departure}
                key={`${b.time}-${b.line}`}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
