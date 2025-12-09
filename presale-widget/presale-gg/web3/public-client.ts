import { PublicClient, createPublicClient, http } from "viem";
import { base, bsc, mainnet, polygon } from "viem/chains";

import { rpcMap } from "./util";

export const publicClients: Record<1 | 56 | 8453 | 137, PublicClient> = {
  "1": createPublicClient({
    chain: mainnet,
    transport: http(rpcMap?.["1"]),
  }),
  "56": createPublicClient({
    chain: bsc,
    transport: http(rpcMap?.["56"]),
  }),
  "8453": createPublicClient({
    chain: base,
    transport: http(rpcMap?.["8453"]),
  }) as PublicClient,
  "137": createPublicClient({
    chain: polygon,
    transport: http(rpcMap?.["137"]),
  }),
};

export const getPublicClient = (chainId: 1 | 56 | 8453 | 137): PublicClient => {
  return publicClients[
    (chainId ?? 1).toString() as unknown as keyof typeof publicClients
  ];
};
