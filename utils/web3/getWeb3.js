import Web3 from 'web3'
import { providers, getDefaultProvider } from 'ethers'
export async function getWeb3 () {
  if (process.client) {
    try {
      if (typeof window.web3 !== 'undefined') {
        window.console.log('连接浏览器自带网络')
        return {
          web3_http: new Web3(window.web3.currentProvider),
          web3: new Web3(new Web3.providers.WebsocketProvider(process.env.eth_provider)),
          library: new providers.Web3Provider(window.web3.currentProvider)
        }
      } else {
        const provider = getDefaultProvider('rinkeby')
        window.console.log('连接以太坊主网')
        return {
          web3_http: new Web3(new Web3.providers.HttpProvider(process.env.eth_provider_http)),
          web3: new Web3(new Web3.providers.WebsocketProvider(process.env.eth_provider)),
          library: new providers.Web3Provider(provider)
        }
      }
    } catch (error) {
      console.log('请同意访问钱包地址')
    }
  }
}
