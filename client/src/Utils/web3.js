import Web3 from "web3";

let web3;

if (typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);

  if (typeof window.ethereum.autoRefreshOnNetworkChange !== "undefined") {
    window.ethereum.autoRefreshOnNetworkChange = false;
  }

  window.ethereum.on("chainChanged", () => {
    document.location.reload();
  });

  window.ethereum
    .enable()
    .then(console.log)
    .catch(() =>
      alert("This application requires user approval to function correctly!")
    );
} else {
  web3 = new Web3(window.web3.currentProvider);
}

export default web3;
