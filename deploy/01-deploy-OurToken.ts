import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import verify from "../utils/verify";

const deployOurToken: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainName: string = network.name!;
    const chainId: number = network.config.chainId!;

    const waitingConfirmations = networkConfig[chainId].blockConfirmations;
    const tokenName = "OurToken";
    const tokenSymbol = "OT";
    const initialSupply = ethers.utils.parseUnits("50");

    const args: any = [tokenName, tokenSymbol, initialSupply];

    log("Arguments assigned!");

    const ourToken = await deploy("OurToken", {
        contract: "OurToken",
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: waitingConfirmations,
    });

    log("OurToken deployed!");

    if (chainId == 4 && process.env.ETHERSCAN_API_KEY!) {
        verify(ourToken.address, args);
    }

    log("---------------------------------------------");
};

export default deployOurToken;
deployOurToken.tags = ["all", "ourToken"];
