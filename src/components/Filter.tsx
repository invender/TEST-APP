import { Card, Checkbox, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import TripsStore from "../models/trips";
import styles from "./Filter.module.css";
const { Title } = Typography;

interface ICustomCheckbox {
  store: Instance<typeof TripsStore>;
  text: string;
  value: number;
}

const CustomCheckbox: React.FC<ICustomCheckbox> = observer(
  ({ store, text, value }) => {
    const checked = () => {
      return store.layoversFilter.includes(value);
    };
    return (
      <Checkbox
        checked={checked()}
        className={styles.checkbox}
        onChange={(e) => {
          console.log(e.target.checked);
          
          if (e.target.checked) {
            store.addLayoversFilter(value);
          } else {
            store.removeLayoversFilter(value);
          }
        }}
      >
        {text}
      </Checkbox>
    );
  }
);

interface IFilter {
  store: Instance<typeof TripsStore>;
}

const Filter: React.FC<IFilter> = ({ store }) => {
  return (
    <Card>
      <Title level={5} className={styles.title}>
        КОЛИЧЕСТВО ПЕРСАДОК
      </Title>
      <CustomCheckbox store={store} text="Без пересадок" value={0} />
      <CustomCheckbox store={store} text="Одна пересадка" value={1} />
      <CustomCheckbox store={store} text="Две пересадки" value={2} />
      <CustomCheckbox store={store} text="Три пересадки" value={3} />
      <CustomCheckbox store={store} text="Четыре пересадки" value={4} />
    </Card>
  );
};

export default observer(Filter);
