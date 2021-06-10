import Web3 from "web3";

let web3: Web3 | undefined;

const Window = window as Window &
  typeof globalThis & { ethereum: any; web3: Web3 };

if (typeof Window.ethereum !== "undefined") {
  web3 = new Web3(Window.ethereum);

  if (typeof Window.ethereum.autoRefreshOnNetworkChange !== "undefined") {
    Window.ethereum.autoRefreshOnNetworkChange = false;
  }

  Window.ethereum.on("chainChanged", () => {
    document.location.reload();
  });

  Window.ethereum
    .enable()
    .then(console.log)
    .catch(() =>
      alert("This application requires user approval to function correctly!")
    );
} else if (Window.web3?.currentProvider) {
  web3 = new Web3(Window.web3.currentProvider);
}

export default web3;
