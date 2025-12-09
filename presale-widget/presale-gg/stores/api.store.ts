import { map } from "nanostores";

import { api } from "../api";
import { API } from "../api";
import { useNanostore } from "../util";

export type ApiStoreValue = {
  stage: API.Stage | null;
  stageLoading: boolean;
  paymentTokens: API.PaymentToken[] | null;
  paymentTokensLoading: boolean;
  presaleEnded: boolean;
  leaderboard: API.LeaderboardEntry[] | null;
  info: API.Info | null;
  infoLoading: boolean;
};

export const defaultApiState: ApiStoreValue = {
  stage: null,
  stageLoading: true,
  paymentTokens: null,
  paymentTokensLoading: true,
  presaleEnded: false,
  leaderboard: null,
  info: null,
  infoLoading: true,
};

export const $apiState = map({ ...defaultApiState });
export const useApiState = () => useNanostore($apiState, defaultApiState);

export const setStage = (stage: API.Stage | null) => {
  if (!stage) {
    $apiState.setKey("presaleEnded", true);
  } else {
    $apiState.setKey("presaleEnded", false);
  }
  $apiState.setKey("stage", stage);
  $apiState.setKey("stageLoading", false);
};

export const setPresaleEnded = (presaleEnded: boolean) => {
  $apiState.setKey("presaleEnded", presaleEnded);
};

export const setLeaderboard = (leaderboard: API.LeaderboardEntry[]) => {
  $apiState.setKey("leaderboard", leaderboard);
};

export const setPaymentTokensLoading = (loading: boolean) =>
  $apiState.setKey("paymentTokensLoading", loading);

export const setPaymentTokens = (paymentTokens: API.PaymentToken[]) => {
  $apiState.setKey("paymentTokens", paymentTokens);
  $apiState.setKey("paymentTokensLoading", false);
};

export const setApiInfo = (info: API.Info) => {
  $apiState.setKey("info", info);
  $apiState.setKey("infoLoading", false);
};

export const fetchApiData = () => {
  api
    .getActiveStage()
    .then((res) => setStage(res.data))
    .catch(() => {});
  api.getPrices().then((res) => setPaymentTokens(res.data));
  api.getProjectInfo().then((res) => setApiInfo(res.data));
};
