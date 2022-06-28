import { Card } from "antd";
import { Instance } from "mobx-state-tree";
import { TripModel } from "../models/trips";
import { Typography } from "antd";
import styles from "./Trip.module.css";
import { Flight } from "./Flight";
const { Title } = Typography;

interface ITrip {
  trip: Instance<typeof TripModel>;
}

const Trip: React.FC<ITrip> = ({ trip }) => {
  return (
    <Card className={styles.main}>
      <Title className={styles.price} level={3}>
        {trip.cost.toLocaleString()} Р
      </Title>
      <img className={styles.image} src={trip.airlineImage} alt="" />
      <Flight flight={trip.departure} />
      <Flight flight={trip.return} />
    </Card>
  );
};

export default Trip;
