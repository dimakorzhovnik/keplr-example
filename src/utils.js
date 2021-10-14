const CYBER = {
  DENOM_CYBER: "boot",
  DENOM_CYBER_G: `GBOOT`,
  CHAIN_ID: "bostrom-testnet-5",
  CYBER_NODE_URL_API: "https://rpc.bostromdev.cybernode.ai",
  CYBER_WEBSOCKET_URL: "wss://rpc.bostromdev.cybernode.ai/websocket",
  CYBER_NODE_URL_LCD: "https://lcd.bostromdev.cybernode.ai",
  BECH32_PREFIX_ACC_ADDR_CYBER: "bostrom",
  MEMO_KEPLR: "[bostrom] cyber.page, using keplr",
  DEFAULT_GAS_LIMITS: 200000,
  VESTING_TIME_HOURS: 3600,
};

const configKeplr = () => {
  return {
    // Chain-id of the Cosmos SDK chain.
    chainId: CYBER.CHAIN_ID,
    // The name of the chain to be displayed to the user.
    chainName: CYBER.CHAIN_ID,
    // RPC endpoint of the chain.
    rpc: CYBER.CYBER_NODE_URL_API,
    rest: CYBER.CYBER_NODE_URL_LCD,
    stakeCurrency: {
      coinDenom: "BOOT",
      coinMinimalDenom: "boot",
      coinDecimals: 0,
    },
    bip44: {
      // You can only set the coin type of BIP44.
      // 'Purpose' is fixed to 44.
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: CYBER.BECH32_PREFIX_ACC_ADDR_CYBER,
      bech32PrefixAccPub: `${CYBER.BECH32_PREFIX_ACC_ADDR_CYBER}pub`,
      bech32PrefixValAddr: `${CYBER.BECH32_PREFIX_ACC_ADDR_CYBER}valoper`,
      bech32PrefixValPub: `${CYBER.BECH32_PREFIX_ACC_ADDR_CYBER}valoperpub`,
      bech32PrefixConsAddr: `${CYBER.BECH32_PREFIX_ACC_ADDR_CYBER}valcons`,
      bech32PrefixConsPub: `${CYBER.BECH32_PREFIX_ACC_ADDR_CYBER}valconspub`,
    },
    currencies: [
      {
        // Coin denomination to be displayed to the user.
        coinDenom: "BOOT",
        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
        coinMinimalDenom: "boot",
        // # of decimal points to convert minimal denomination to user-facing denomination.
        coinDecimals: 0,
      },
    ],
    // List of coin/tokens used as a fee token in this chain.
    feeCurrencies: [
      {
        // Coin denomination to be displayed to the user.
        coinDenom: "BOOT",
        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
        coinMinimalDenom: "boot",
        // # of decimal points to convert minimal denomination to user-facing denomination.
        coinDecimals: 0,
      },
    ],
    coinType: 118,
    gasPriceStep: {
      low: 0.001,
      average: 0.01,
      high: 0.025,
    },
  };
};

export { configKeplr, CYBER };
