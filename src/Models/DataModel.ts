export interface Stop {
  id: string;
  name: string;
  type: string;
  x: string;
  y: string;
  lon: number;
  lat: number;
}

export interface Terminal {
  id: string;
  name: string;
  x: number;
  y: number;
  lon: number;
  lat: number;
}

export interface Connection {
  time: string;
  "*G": string;
  "*Z": string;
  type: string;
  line: string;
  operator: string;
  color: string;
  type_name: string;
  terminal: Terminal;
  "*L": string;
  track: string;
  arr_delay: string;
  dep_delay: string;
}

export interface StationBoardData {
  stop: Stop;
  connections: Connection[];
  request?: any;
  eof: number;
}
