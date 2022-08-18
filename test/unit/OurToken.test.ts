import { assert, expect } from "chai";
import { deployments, ethers, network } from "hardhat";
import { BigNumber } from "ethers";
import { developmentChains } from "../../helper-hardhat-config";
import { OurToken } from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("OurToken", function () {
          let ourToken: OurToken;
          let deployer: SignerWithAddress;
          this.beforeEach(async function () {
              const accounts = await ethers.getSigners();
              deployer = accounts[0];
              await deployments.fixture(["ourToken"]);
              ourToken = await ethers.getContract("OurToken", deployer);
          });

          describe("constructor", function () {
              it("Has a name", async function () {
                  const nameFromContract = await ourToken.name();
                  assert.equal(nameFromContract, "OurToken");
              });

              it("Has a symbol", async function () {
                  const symbolFromContract = await ourToken.symbol();
                  assert.equal(symbolFromContract, "OT");
              });

              it("Has a initial supply", async function () {
                  const supplyFromContract = await ourToken.totalSupply();
                  assert.equal(
                      supplyFromContract.toString(),
                      ethers.utils.parseUnits("50").toString()
                  );
              });

              it("Deployer has the tokens", async function () {
                  const deployerBalance = await ourToken.balanceOf(
                      deployer.address
                  );
                  assert.equal(
                      deployerBalance.toString(),
                      ethers.utils.parseUnits("50").toString()
                  );
              });
          });
      });
