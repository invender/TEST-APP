import { Radio } from "antd";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import TripsStore, { TripSortEnum } from "../models/trips";
import styles from "./Sort.module.css";
interface ISort {
  store: Instance<typeof TripsStore>;
}

const Sort: React.FC<ISort> = ({ store }) => {
  return (
    <>
      <Radio.Group
        className={styles.radioGroup}
        value={store.sort}
        onChange={(e) => {
          store.setSort(e.target.value);
        }}
        buttonStyle="solid"
        size="large"
      >
        <Radio.Button
          className={styles.radioButton}
          value={TripSortEnum.cost}
        >
          Самый дешевый
        </Radio.Button>
        <Radio.Button
          className={styles.radioButton}
          value={TripSortEnum.duration}
        >
          Самый быстрый
        </Radio.Button>
      </Radio.Group>
    </>
  );
};

export default observer(Sort);
