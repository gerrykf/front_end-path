export function myPiniaPlugin1() {
  return {
    secret: "myPiniaPlugin1",
  };
}

export function myPiniaPlugin2(ctx) {
  const { store } = ctx;
  store.test = "myPiniaPlugin2";
}

export function myPiniaPlugin3({ store }) {
  if (store.id === "counter") {
    return {
      name: "myPiniaPlugin3",
    };
  }
}
