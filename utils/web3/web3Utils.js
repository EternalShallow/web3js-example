import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import COIN_ABI from './coinABI'
import { keepPoint } from '../function'
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

export function useTokenContractWeb3 (ABI, tokenAddress) {
  if (!ABI) {
    console.error('no ABI')
    return
  }
  if (!tokenAddress) {
    console.log('no tokenAddress')
    return
  }
  if (process.client) {
    const { $web3_http } = window.$nuxt
    return new $web3_http.eth.Contract(
      ABI,
      tokenAddress
    )
  }
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

export async function getMiningInfo ({ univ2Contract, reawordPoolContract, default_point, wei }) {
  if (process.client) {
    const { $web3_http, $account } = window.$nuxt
    const balance_UNIV2 = {}
    const balance_univ2_ = await univ2Contract.methods.balanceOf($account).call()
    // univ2 未质押数量
    balance_UNIV2.balance_univ2_wei = balance_univ2_
    balance_UNIV2.balance_univ2_original = $web3_http.utils.fromWei(balance_univ2_, wei)
    balance_UNIV2.balance_univ2 = keepPoint(balance_UNIV2.balance_univ2_original, default_point)
    // 可取YF数量
    const balance_yf_eran = await reawordPoolContract.methods.earned($account).call()
    balance_UNIV2.balance_yf_eran_original = $web3_http.utils.fromWei(balance_yf_eran, wei)
    balance_UNIV2.balance_yf_eran = keepPoint(balance_UNIV2.balance_yf_eran_original, default_point)
    // univ2 质押数量
    const balance_univ2_stake = await reawordPoolContract.methods.balanceOf($account).call()
    console.log(balance_univ2_stake)
    balance_UNIV2.balance_univ2_stake_wei = balance_univ2_stake
    balance_UNIV2.balance_univ2_stake_original = $web3_http.utils.fromWei(balance_univ2_stake, wei)
    balance_UNIV2.balance_univ2_stake = keepPoint(balance_UNIV2.balance_univ2_stake_original, default_point)
    console.log(balance_UNIV2)
    return balance_UNIV2
  }
}
