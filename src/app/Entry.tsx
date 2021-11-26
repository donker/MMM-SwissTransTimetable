import { Connection } from "../Models/DataModel";

interface EntryProps {
  connection: Connection;
  departure: boolean;
}

const Entry: React.FC<EntryProps> = (props) => {
  var transportClass = "bus";
  switch (props.connection.type_name) {
    case "Railway":
    case "S-Train":
      transportClass = "train";
      break;
    case "S":
      transportClass = "subway";
      break;
  }
  let delay = "";
  if (props.departure) {
    delay =
      props.connection.dep_delay == "+0" ? "" : props.connection.dep_delay;
  } else {
    delay =
      props.connection.arr_delay == "+0" ? "" : props.connection.arr_delay;
  }
  return (
    <tr>
      <td>
        {props.connection.time.substr(11, 5)} {delay}
      </td>
      <td>{props.connection.track}</td>
      <td>
        <i className={"fas fa-" + transportClass}></i> {props.connection.line}
      </td>
      <td>{props.connection.terminal.name}</td>
    </tr>
  );
};

export default Entry;
