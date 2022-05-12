import join from "url-join"

import { Network, isKnownNetwork } from "../../shared/networks"
import { Transaction } from "../../shared/transactions"
import { WalletAccount } from "../../shared/wallet.model"
import { fetchWithTimeout } from "../utils/fetchWithTimeout"
import { mapVoyagerTransactionToTransaction } from "./transformers"

export interface VoyagerTransaction {
  blockId: string
  entry_point_type: string
  globalIndex: number
  hash: string
  index: number
  signature: string[]
  timestamp: number
  to: string
  type: string
}

export const fetchVoyagerTransactions = async (
  address: string,
  network: Network,
): Promise<VoyagerTransaction[]> => {
  const { explorerUrl } = network
  if (!explorerUrl) {
    return []
  }
  const response = await fetchWithTimeout(
    join(explorerUrl, "api/txns", `?to=${address}`),
  )
  const { items } = await response.json()
  return items
}

export async function getHistoryTransactionsForAccounts(
  accountsToPopulate: WalletAccount[],
  metadataTransactions: Transaction[] = [],
) {
  const accountsWithHistory = accountsToPopulate.filter((account) =>
    isKnownNetwork(account.network.id),
  )
  const transactionsPerAccount = await Promise.all(
    accountsWithHistory.map(async (account) => {
      const voyagerTransactions = await fetchVoyagerTransactions(
        account.address,
        account.network,
      )
      return voyagerTransactions.map((transaction) =>
        mapVoyagerTransactionToTransaction(
          transaction,
          account,
          metadataTransactions.find((tx) => tx.hash === transaction.hash)?.meta,
        ),
      )
    }),
  )
  return transactionsPerAccount.flat()
}
