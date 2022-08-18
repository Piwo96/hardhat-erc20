import { assert } from "chai";
import { ethers, network } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { OurToken } from "../../typechain-types";
import { developmentChains } from "../../helper-hardhat-config";
import { experimentalAddHardhatNetworkMessageTraceHook } from "hardhat/config";

developmentChains.includes(network.name)
    ? describe.skip
    : describe("OurToken", function () {
          let deployer: SignerWithAddress;
          let ourToken: OurToken;
          this.beforeEach(async function () {
              const accounts = await ethers.getSigners();
              deployer = accounts[0];
              ourToken = await ethers.getContract("OurToken", deployer);
          });

          describe("constructor", function () {
              it("Sends the tokens to the deployer", async function () {
                  const deployersBalance = await ourToken.balanceOf(
                      deployer.address
                  );
                  assert.equal(
                      deployersBalance.toString(),
                      ethers.utils.parseUnits("50").toString()
                  );
              });
          });
      });
