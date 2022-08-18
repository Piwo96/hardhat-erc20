import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "hardhat-gas-reporter";
import "hardhat-deploy";

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL! || "https://eth-rinkeby";
const PRIVATE_KEY = process.env.PRIVATE_KEY! || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY! || "";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY! || "";

const config: HardhatUserConfig = {
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.8.0" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            chainId: 31337,
        },
        rinkeby: {
            chainId: 4,
            accounts: [PRIVATE_KEY],
            url: RINKEBY_RPC_URL,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true, // wenn man gerade nicht das Gas prüft kann es ausgeschaltet werden
        outputFile: "gas-report.txt", // optional
        noColors: true, // optional
        currency: "USD", // optional; API Key von CoinMarketCap
        // coinmarketcap: COINMARKETCAP_API_KEY, // notwendig for API Call, kann auskommentiert werden
        token: "ETH", // um Kosten auf anderen Chains zu testen wie MATIC
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
    mocha: {
        timeout: 300000, // 300000 Millisekunde = 300 Sekunden
    },
};

export default config;
