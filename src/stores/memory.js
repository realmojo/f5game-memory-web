import { observable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

const doGetLevel = () => {
  return new Promise(async (resolve) => {
    const level = await AsyncStorage.getItem("f5game-memory-level");
    resolve(level ? Number(level) : 1);
  });
};

const getRandomNumber = (min, max) => {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
};

const memory = observable({
  items: [],
  memoryItem: [],
  times: 0,
  level: 1,
  async setLevel(level) {
    await AsyncStorage.setItem("f5game-memory-level", `${level}`);
  },
  initLevel() {
    runInAction(async () => {
      this.level = await doGetLevel();
    });
  },
  setItems() {
    this.items = [];
    for (let i = 0; i < 16; i++) {
      runInAction(() => {
        this.items.push({
          active: false,
        });
      });
    }
  },
  changeItem(value, flag) {
    runInAction(() => {
      this.items[value].active = flag;
    });
  },
  setMemoryItem() {
    this.memoryItem = [];
    for (let i = 0; i < this.level + 2; i++) {
      runInAction(() => {
        this.memoryItem.push(getRandomNumber(0, 16));
      });
    }
  },
});

export { memory };
