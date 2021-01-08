import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import COIN_ABI from './coinABI'
// add 10%
export function calculateGasMargin (value) {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

export async function getGasPrice () {
  if (process.client) {
    const { $web3_http } = window.$nuxt
    const get_gas_price = await $web3_http.eth.getGasPrice()
    return '0x' + get_gas_price.toString(16)
  }
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress (value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function useTokenContract (tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, COIN_ABI.coin_abi_UNIV2, withSignerIfPossible)
}

function useContract (address = undefined, ABI, withSignerIfPossible = true) {
  if (process.client) {
    const { $library, $account } = window.$nuxt
    try {
      return getContract(address, ABI, $library, withSignerIfPossible && $account ? $account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }
}

// account is optional
export function getContract (address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account))
}

// account is not optional
export function getSigner (library, account) {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner (library, account) {
  return account ? getSigner(library, account) : library
}
