import TripsStore, { TripSortEnum } from "./models/trips";
import { SnapshotIn } from "mobx-state-tree";
import image from "./media/S7.png";

export const mockData: SnapshotIn<typeof TripsStore> = {
  trips: [
    {
      id: 0,
      cost: 13400,
      airlineImage: image,
      departure: {
        timeDeparture: new Date("2022-06-27T10:45Z"),
        timeArrival: new Date("2022-06-28T08:00Z"),
        airportArrival: "MOW",
        airportDeparture: "HKT",
        layovers: ["HKG", "JBN"],
      },
      return: {
        timeDeparture: new Date("2022-06-29T11:20Z"),
        timeArrival: new Date("2022-06-30T00:50Z"),
        airportArrival: "HKT",
        airportDeparture: "MOW",
        layovers: ["HKG"],
      },
    },
    {
      id: 1,
      cost: 15400,
      airlineImage: image,
      departure: {
        timeDeparture: new Date("2022-06-27T10:45Z"),
        timeArrival: new Date("2022-06-28T08:00Z"),
        airportArrival: "MOW",
        airportDeparture: "HKT",
        layovers: ["HKG", "JBN"],
      },
      return: {
        timeDeparture: new Date("2022-06-29T11:20Z"),
        timeArrival: new Date("2022-06-30T00:50Z"),
        airportArrival: "HKT",
        airportDeparture: "MOW",
        layovers: ["HKG"],
      },
    },
    {
      id: 2,
      cost: 17600,
      airlineImage: image,
      departure: {
        timeDeparture: new Date("2022-06-27T10:45Z"),
        timeArrival: new Date("2022-06-28T00:00Z"),
        airportArrival: "MOW",
        airportDeparture: "HKT",
        layovers: ["HKG"],
      },
      return: {
        timeDeparture: new Date("2022-06-29T11:20Z"),
        timeArrival: new Date("2022-06-29T22:50Z"),
        airportArrival: "HKT",
        airportDeparture: "MOW",
        layovers: [],
      },
    },
  ],
  layoversFilter: [],
  sort: TripSortEnum.cost,
};
