import React from "react";
import ReactDOM from "react-dom";
import App from "../app/App";

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
    container.classList.add("testapp");
    return container;
  },

  notificationReceived: function (notification, payload, sender) {
    if (notification === "DOM_OBJECTS_CREATED") {
      const mainDivs = document.getElementsByClassName("testapp");
      if (mainDivs.length > 0) {
        const sub = document.createElement("div");
        mainDivs[0].appendChild(sub);
        ReactDOM.render(
          <App
            stationName={this.config.stationName}
            limit={this.config.nrLines}
            departure={this.config.departure}
          />,
          sub
        );
      }
    }
  }
});
