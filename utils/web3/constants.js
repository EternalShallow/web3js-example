import JSBI from 'jsbi'
// eslint-disable-next-line no-undef
export const BigintIsh = JSBI || BigInt || String
export const TRANSACTION_ACTIONS = {
  INIT: 'INIT',
  CONFIRMED: 'CONFIRMED',
  ADDED: 'ADDED'
}
export const APPROVE_STATUS = {
  PENDING: 'PENDING',
  NOT_APPROVED: 'NOT_APPROVED',
  APPROVED: 'APPROVED',
  UNKNOWN: 'UNKNOWN'
}
export const LOCAL_PREFIX_VUEX = 'vuex_localstorage_'
export const ChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GÖRLI: 5,
  KOVAN: 42
}
export const TradeType = {
  EXACT_INPUT: 0,
  EXACT_OUTPUT: 1
}
export const Rounding = {
  ROUND_DOWN: 0,
  ROUND_HALF_UP: 1,
  ROUND_UP: 2
}
export const FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
export const INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'
export const MINIMUM_LIQUIDITY = JSBI
export const ZERO = JSBI
export const ONE = JSBI
export const TWO = JSBI
export const THREE = JSBI
export const FIVE = JSBI
export const TEN = JSBI
export const _100 = JSBI
export const _997 = JSBI
export const _1000 = JSBI
export const SolidityType = {
  uint8: 'uint8',
  uint256: 'uint256'
}
export const SOLIDITY_TYPE_MAXIMA = {
  uint8: JSBI,
  uint256: JSBI
}
