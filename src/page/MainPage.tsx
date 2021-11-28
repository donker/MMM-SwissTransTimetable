import React from "react";
import ReactDOM from "react-dom";
import Timetable from "../app/Timetable";

interface MMTestProps {
  stationName: string;
  nrLines: number;
  departure: boolean;
}

Module.register<MMTestProps>("MMM-SwissTransTimetable", {
  defaults: {
    stationName: "Neuchâtel",
    nrLines: 10,
    departure: true
  },

  getDom: function () {
    const container = document.createElement("div");
    container.classList.add("swiss-trans-timetable");
    return container;
  },

  notificationReceived: function (notification, payload, sender) {
    if (notification === "DOM_OBJECTS_CREATED") {
      const mainDivs = document.getElementsByClassName("swiss-trans-timetable");
      if (mainDivs.length > 0) {
        ReactDOM.render(
          <Timetable
            stationName={this.config.stationName}
            limit={this.config.nrLines}
            departure={this.config.departure}
          />,
          mainDivs[0]
        );
      }
    }
  }
});
