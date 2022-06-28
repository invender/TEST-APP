import { observer } from "mobx-react-lite";
import { IArrayType, Instance } from "mobx-state-tree";
import TripsStore  from "../models/trips";
import styles from "./Trips.module.css";
import Trip from "./Trip";
interface ITrips {
  store: Instance<typeof TripsStore>;
}

const Trips: React.FC<ITrips> = ({ store }) => {
  return (
    <div className={styles.main}>
      {store.filteredAndSortedTrips.map((trip) => (
        <Trip key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default observer(Trips);
