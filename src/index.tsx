import "antd/dist/antd.css";
import App from "./components/App";
import { render } from "react-dom";
import TripsStore from "./models/trips";
import { Instance, SnapshotIn, destroy, getSnapshot } from "mobx-state-tree";
import { mockData } from "./mockData";
import { connectReduxDevtools } from "mst-middlewares"

let store: Instance<typeof TripsStore>;

function createTripsStore(snapshot: SnapshotIn<typeof TripsStore>) {
  if (store) destroy(store);
  store = TripsStore.create(snapshot);
  connectReduxDevtools(require("remotedev"), store)
  return store;
}

function renderApp(store: Instance<typeof TripsStore>) {
  render(<App store={store} />, document.getElementById("root"));
}


renderApp(createTripsStore(mockData));

if (module.hot) {
  module.hot.accept(["./models/trips"], () => {
    renderApp(createTripsStore(getSnapshot(store)));
  });

  module.hot.accept(["./components/App"], () => {
    renderApp(store);
  });
}
