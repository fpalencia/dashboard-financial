import { defineStore } from "pinia";
import type { Info, Chart } from "@/types/history";
import type { Price } from "@/types/resumen";
import { Constituent } from "@/types/constituyentes";

const valueDefault = 'IPSA';

export const useChartStore = defineStore("useChartStore", {
  state: () => ({
    constituents: [] as Constituent[],
    history: {
      info: {} as Info,
      chart: [] as Chart[]
    },
    summary: {
      price: {} as Price
    }
  }),
  actions: {
   async getConstituents() {
      try {
        const response = await fetch(`/data/constituyentes/constituensList.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        this.constituents = jsonData.data.constituents;
        console.log(this.constituents);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
      }
    },
    async getHistory(value:string = valueDefault) {
      try {
        const response = await fetch(`/data/history/history-${value}.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        this.history = jsonData.data;
        console.log(this.history);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
      }
    },
    async getSummary(value:string = valueDefault) {
      try {
        const response = await fetch(`/data/resumen/${value}.json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        this.summary = jsonData.data;
        console.log(this.summary);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
      }
    }
  }
});