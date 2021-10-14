const { coins, coin } = require("@cosmjs/launchpad");
const { SigningCyberClient } = require("@cybercongress/cyber-js");
const { configKeplr, CYBER } = require("./utils");

let cyberClient = null;

const fee = {
  amount: [],
  gas: CYBER.DEFAULT_GAS_LIMITS.toString(),
};

const init = async () => {
  if (!window.getOfflineSigner || !window.keplr) {
    alert("Please install keplr extension");
  } else {
    if (window.keplr.experimentalSuggestChain) {
      try {
        await window.keplr.experimentalSuggestChain(configKeplr());
      } catch {
        alert("Failed to suggest the chain");
      }
    } else {
      alert("Please use the recent version of keplr extension");
    }
  }

  const chainId = CYBER.CHAIN_ID;

  await window.keplr.enable(chainId);

  const offlineSigner = await window.getOfflineSignerAuto(chainId);

  console.log(`offlineSigner`, offlineSigner);

  const [{ address }] = await offlineSigner.getAccounts();
  console.log(`address`, address);

  // Initialize the gaia api with the offline signer that is injected by Keplr extension.
  const options = { prefix: CYBER.BECH32_PREFIX_ACC_ADDR_CYBER };
  const client = await SigningCyberClient.connectWithSigner(
    CYBER.CYBER_NODE_URL_API,
    offlineSigner,
    options
  );

  cyberClient = client;

  console.log(`client`, client);

  document.getElementById("address").innerHTML = address;
};

window.onload = async () => {
  init();
};

window.addEventListener("keplr_keystorechange", () => {
  console.log(
    "Key store in Keplr is changed. You may need to refetch the account info."
  );
  init();
});

document.sendForm.onsubmit = () => {
  let recipient = document.sendForm.recipient.value;
  let amount = document.sendForm.amount.value;

  amount = parseFloat(amount);
  if (isNaN(amount)) {
    alert("Invalid amount");
    return false;
  }

  amount = Math.floor(amount);

  (async () => {
  
    const [{ address }] = await cyberClient.signer.getAccounts();

    console.log(`address`, address)

    const result = await cyberClient.sendTokens(
      address,
      recipient,
      coins(amount, CYBER.DENOM_CYBER),
      fee
    );

    console.log(result);

    if (result.code !== undefined && result.code !== 0) {
      alert("Failed to send tx: " + result.log || result.rawLog);
    } else {
      alert("Succeed to send tx");
    }
  })();

  return false;
};

document.linkForm.onsubmit = () => {
  let fromCid = document.linkForm.from.value;
  let toCid = document.linkForm.to.value;

  (async () => {
    const [{ address }] = await cyberClient.signer.getAccounts();

    console.log(`address`, address);

    const result = await cyberClient.cyberlink(address, fromCid, toCid, fee);

    console.log(result);

    if (result.code !== undefined && result.code !== 0) {
      alert("Failed to cyberlink tx: " + result.log || result.rawLog);
    } else {
      alert("Succeed to cyberlink tx");
    }
  })();

  return false;
};


document.mintForm.onsubmit = () => {
  let selected = document.mintForm.btnradio.value;
  let amountMint = document.mintForm.amountMint.value;
  let valueHours = document.mintForm.hours.value;

  valueHours = parseFloat(valueHours);

  (async () => {
    const [{ address }] = await cyberClient.signer.getAccounts();

    console.log(`address`, address);

     const result = await cyberClient.investmint(
       address,
       coin(parseFloat(amountMint), "hydrogen"),
       selected,
       parseFloat(CYBER.VESTING_TIME_HOURS * valueHours),
       fee
     );

    console.log(result);

    if (result.code !== undefined && result.code !== 0) {
      alert("Failed to cyberlink tx: " + result.log || result.rawLog);
    } else {
      alert("Succeed to cyberlink tx");
    }
  })();

  return false;
};