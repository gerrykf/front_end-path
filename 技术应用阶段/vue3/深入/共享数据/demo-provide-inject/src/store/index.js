import { provideStore as provideLoginUserStore } from "./useLoginUser";

export default function provideStore(app) {
  provideLoginUserStore(app);
}
