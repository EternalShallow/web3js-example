import Web3 from 'web3'
export async function getWeb3 () {
  if (process.client) {
    const web3 = window.web3
    try {
      if (typeof web3 !== 'undefined') {
        window.console.log('连接浏览器自带网络')
        return new Web3(window.web3.currentProvider)
      } else {
        window.console.log('连接以太坊主网')
        return new Web3(new Web3.providers.HttpProvider(process.env.ethInfuraProvider))
      }
    } catch (error) {
      console.log('请同意访问钱包地址')
    }
  }
}
