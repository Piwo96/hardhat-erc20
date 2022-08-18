interface NetworkConfigInfo {
    [id: number]: NetworkConfigItem;
}

interface NetworkConfigItem {
    name: string;
    blockConfirmations?: number;
}

export const networkConfig: NetworkConfigInfo = {
    4: {
        name: "rinkeby",
        blockConfirmations: 6,
    },
    31337: {
        name: "localhost",
    },
};

export const developmentChains = ["hardhat", "localhost"];
