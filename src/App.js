import logo from './logo.svg';
import './App.css';
import * as routerDom from "react-router-dom";
import WalletPage from './WalletPage';

console.log(routerDom);


const Home = () => {
  const navigate = routerDom.useNavigate();

  console.log(navigate);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        console.log(accounts);
        navigate('/walletPage', {state: {account: accounts[0]}});
      } catch (err) {
        console.log(err);
      }
    }
  }
  return <button type="button" onClick={connectWallet}>Connect to a wallet</button>
};

function App() {
 

  return (
    <routerDom.BrowserRouter>
      <routerDom.Routes>
        <routerDom.Route path="/" element={<Home />} />
        <routerDom.Route path="/walletPage" element={<WalletPage/>} />
        </routerDom.Routes>
      </routerDom.BrowserRouter>
  );
}

export default App;
