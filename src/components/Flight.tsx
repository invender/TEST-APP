import { Typography } from "antd";
import { Instance } from "mobx-state-tree";
import { FlightModel } from "../models/trips";
import styles from "./Flight.module.css";
const { Text } = Typography;

interface IFlight {
  flight: Instance<typeof FlightModel>;
}

export function plural(forms: string[], n: number) {
  let idx;
  if (n % 10 === 1 && n % 100 !== 11) {
    idx = 0;
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    idx = 1;
  } else {
    idx = 2;
  }
  return forms[idx] || "";
}

export const Flight: React.FC<IFlight> = ({ flight }) => {
  return (
    <>
      <div className={styles.container}>
        <Text strong type="secondary">
          {flight.airportDeparture} - {flight.airportArrival}
        </Text>
        <Text strong>
          {flight.timeDeparture.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {" - "}
          {flight.timeArrival.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </div>
      <div className={styles.container}>
        <Text strong type="secondary">
          В ПУТИ
        </Text>
        <Text strong>
          {Math.floor((flight.duration / (1000 * 60 * 60)) % 24) +
            "ч " +
            Math.floor((flight.duration / (1000 * 60)) % 60) +
            "м"}
        </Text>
      </div>
      <div className={styles.container}>
        <Text strong type="secondary">
          {flight.layovers.length +
            " " +
            plural(
              ["ПЕРЕСАДКА", "ПЕРЕСАДКИ", "ПЕРЕСАДОК"],
              flight.layovers.length
            )}
        </Text>
        <Text strong>{flight.layovers.join(", ")}</Text>
      </div>
    </>
  );
};
