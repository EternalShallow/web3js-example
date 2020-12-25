/* eslint-disable */
export const Blockchains = {
    EOS:'eos',
    ETH:'eth',
    TRX:'trx',
    YTA:'yta',
};

export const BlockchainsArray =
    Object.keys(Blockchains).map(key => ({key, value:Blockchains[key]}));
