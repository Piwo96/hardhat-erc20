import { run, ethers } from "hardhat";

async function main() {
    try {
        const tokenName = "Delirium";
        const tokenSymbol = "DELIR";
        const initialSupply = ethers.utils.parseUnits("21000000");
        await run("verify:verify", {
            contract: "contracts/OurToken.sol:OurToken",
            address: "0x70c3b6590DB3cC2A1Ad42be793D6e25781Dd1182",
            constructorArguments: [tokenName, tokenSymbol, initialSupply],
        });
    } catch (error: any) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(error);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
