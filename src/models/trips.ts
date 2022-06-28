import { types, Instance, cast, IArrayType } from "mobx-state-tree";

export const FlightModel = types
  .model({
    timeArrival: types.Date,
    timeDeparture: types.Date,
    airportArrival: types.string,
    airportDeparture: types.string,
    layovers: types.array(types.string),
  })
  .views((self) => ({
    get duration() {
      return self.timeArrival.getTime() - self.timeDeparture.getTime();
    },
  }));

export const TripModel = types.model({
  cost: types.number,
  airlineImage: types.string,
  departure: FlightModel,
  return: FlightModel,
  id: types.identifierNumber,
});

export enum TripSortEnum {
  cost = "cost",
  duration = "duration",
}

interface ITripSorter {
  (
    tripA: Instance<typeof TripModel>,
    tripB: Instance<typeof TripModel>
  ): number;
}

const TripSorters: {
  [key in TripSortEnum]: ITripSorter;
} = {
  cost: (tripA, tripB) => tripA.cost - tripB.cost,
  duration: (tripA, tripB) =>
    tripA.departure.duration +
    tripA.return.duration -
    (tripB.departure.duration + tripB.return.duration),
};

const TripSortType = types.enumeration<TripSortEnum>(
  Object.values(TripSortEnum)
);

const TripsStore = types
  .model({
    trips: types.array(TripModel),
    layoversFilter: types.array(types.number),
    sort: TripSortType,
  })
  .views((self) => ({
    get filteredAndSortedTrips(): Instance<IArrayType<typeof TripModel>> {
      return cast(
        [...self.trips]
          .filter((trip) => {
            if (self.layoversFilter.length !== 0) {
              return self.layoversFilter.includes(
                Math.max(
                  trip.departure.layovers.length,
                  trip.return.layovers.length
                )
              );
            }
            return true;
          })
          .sort(TripSorters[self.sort])
      );
    },
  }))
  .actions((self) => ({
    addLayoversFilter(filter: number) {
      self.layoversFilter.push(filter);
    },
    removeLayoversFilter(filter: number) {
      self.layoversFilter = cast(
        self.layoversFilter.filter((value) => value !== filter)
      );
    },
    setSort(sort: TripSortEnum) {
      self.sort = sort;
    },
  }));

export default TripsStore;
