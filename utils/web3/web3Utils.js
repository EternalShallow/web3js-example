import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { keepPoint } from '../function'
import COIN_ABI from './coinABI'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress (value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function useTokenContract (tokenAddress, ABI, withSignerIfPossible) {
  return useContract(tokenAddress, ABI, withSignerIfPossible)
}

export function useTokenContractUniv2 (tokenAddress) {
  return useTokenContract(tokenAddress, COIN_ABI.coin_abi_UNIV2)
}

export function useTokenContractReawordPool (tokenAddress) {
  return useTokenContract(tokenAddress, COIN_ABI.abi_reaword_pool)
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

// add 10%
export function calculateGasMargin (value) {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

/**
 * 获取 GasPrice
 * @returns {Promise<{gasPrice: string}|{}>}
 */
export async function getGasPrice () {
  if (process.client) {
    const { $web3_http } = window.$nuxt
    try {
      const get_gas_price = await $web3_http.eth.getGasPrice()
      return {
        gasPrice: '0x' + get_gas_price.toString(16)
      }
    } catch (e) {
      console.error(e.message)
      return {}
    }
  }
}

/**
 * 获取 GasLimit
 * @param contract
 * @param methodName
 * @param parameters
 * @returns {Promise<{}|{gasLimit: *}>}
 */
export async function getGasLimit (contract, methodName, parameters) {
  try {
    const estimatedGas = await contract.estimateGas[methodName](parameters)
    return {
      gasLimit: calculateGasMargin(estimatedGas)
    }
  } catch (e) {
    console.error(e.message)
    return {}
  }
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

export async function getMiningLibraryInfo ({ univ2Contract, reawordPoolContract, default_point, wei }) {
  if (process.client) {
    const { $web3_http, $account } = window.$nuxt
    const balance_UNIV2 = {}
    const balance_univ2_ = await univ2Contract.balanceOf($account)
    // univ2 未质押数量
    balance_UNIV2.balance_univ2_wei = balance_univ2_.toString()
    balance_UNIV2.balance_univ2_original = $web3_http.utils.fromWei(balance_univ2_.toString(), wei)
    balance_UNIV2.balance_univ2 = keepPoint(balance_UNIV2.balance_univ2_original, default_point)
    // 可取YF数量
    const balance_yf_eran = await reawordPoolContract.earned($account)
    balance_UNIV2.balance_yf_eran_original = $web3_http.utils.fromWei(balance_yf_eran.toString(), wei)
    balance_UNIV2.balance_yf_eran = keepPoint(balance_UNIV2.balance_yf_eran_original, default_point)
    // univ2 质押数量
    const balance_univ2_stake = await reawordPoolContract.balanceOf($account)
    console.log(balance_univ2_stake.toString())
    balance_UNIV2.balance_univ2_stake_wei = balance_univ2_stake.toString()
    balance_UNIV2.balance_univ2_stake_original = $web3_http.utils.fromWei(balance_univ2_stake.toString(), wei)
    balance_UNIV2.balance_univ2_stake = keepPoint(balance_UNIV2.balance_univ2_stake_original, default_point)
    console.log(balance_UNIV2)
    return balance_UNIV2
  }
}
