const COIN_ABI = {
  coin_abi_YSR: [
    {
      inputs: [{ internalType: 'string', name: 'tokenName', type: 'string' }, {
        internalType: 'string',
        name: 'tokenSymbol',
        type: 'string'
      }, { internalType: 'uint8', name: 'tokenDecimals', type: 'uint8' }],
      stateMutability: 'nonpayable',
      type: 'constructor'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'owner', type: 'address' }, {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address'
      }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }],
      name: 'Approval',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'target', type: 'address' }, {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }],
      name: 'Burn',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'target', type: 'address' }, {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }],
      name: 'Mint',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'from', type: 'address' }, {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }],
      name: 'Transfer',
      type: 'event'
    }, {
      inputs: [{ internalType: 'address', name: 'addr', type: 'address' }, {
        internalType: 'uint8',
        name: 'initPercent',
        type: 'uint8'
      }, { internalType: 'uint256[]', name: 'periods', type: 'uint256[]' }, {
        internalType: 'uint8[]',
        name: 'percents',
        type: 'uint8[]'
      }],
      name: 'addRule',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: 'addr', type: 'address' }, {
        internalType: 'uint256',
        name: 'timeT',
        type: 'uint256'
      }],
      name: 'addTimeT',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [],
      name: 'admin',
      outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: '_owner', type: 'address' }, {
        internalType: 'address',
        name: '_spender',
        type: 'address'
      }],
      name: 'allowance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: '_spender', type: 'address' }, {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }],
      name: 'approve',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: 'target', type: 'address' }, {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }],
      name: 'burn',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address payable', name: 'newAdmin', type: 'address' }],
      name: 'changeAdmin',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [],
      name: 'decimals',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      stateMutability: 'view',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: '_target', type: 'address' }, {
        internalType: 'bool',
        name: '_freeze',
        type: 'bool'
      }],
      name: 'freeze',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: '_target', type: 'address' }, {
        internalType: 'uint256',
        name: '_timestamp',
        type: 'uint256'
      }],
      name: 'freezeWithTimestamp',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: '_target', type: 'address' }],
      name: 'getFrozenAccount',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: '_target', type: 'address' }],
      name: 'getFrozenTimestamp',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    }, {
      inputs: [],
      name: 'kill',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: '_target', type: 'address' }],
      name: 'lockedBalanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: 'target', type: 'address' }, {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }],
      name: 'mint',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address[]', name: '_targets', type: 'address[]' }, {
        internalType: 'bool[]',
        name: '_freezes',
        type: 'bool[]'
      }],
      name: 'multiFreeze',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address[]', name: '_targets', type: 'address[]' }, {
        internalType: 'uint256[]',
        name: '_timestamps',
        type: 'uint256[]'
      }],
      name: 'multiFreezeWithTimestamp',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address[]', name: '_tos', type: 'address[]' }, {
        internalType: 'uint256[]',
        name: '_values',
        type: 'uint256[]'
      }],
      name: 'multiTransfer',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
      name: 'removeRule',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function'
    }, {
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: '_to', type: 'address' }, {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }],
      name: 'transfer',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: '_from', type: 'address' }, {
        internalType: 'address',
        name: '_to',
        type: 'address'
      }, { internalType: 'uint256', name: '_value', type: 'uint256' }],
      name: 'transferFrom',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      inputs: [{ internalType: 'address', name: '_to', type: 'address' }, {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }],
      name: 'transferfix',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }],
  coin_abi_YF: [
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
      name: 'approve',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ name: 'sender', type: 'address' }, { name: 'recipient', type: 'address' }, {
        name: 'amount',
        type: 'uint256'
      }],
      name: 'transferFrom',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ name: '_minter', type: 'address' }],
      name: 'removeMinter',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ name: '', type: 'uint8' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ name: 'spender', type: 'address' }, { name: 'addedValue', type: 'uint256' }],
      name: 'increaseAllowance',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ name: 'account', type: 'address' }, { name: 'amount', type: 'uint256' }],
      name: 'mint',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'governance',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [{ name: 'account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ name: '_minter', type: 'address' }],
      name: 'addMinter',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ name: 'spender', type: 'address' }, { name: 'subtractedValue', type: 'uint256' }],
      name: 'decreaseAllowance',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ name: 'recipient', type: 'address' }, { name: 'amount', type: 'uint256' }],
      name: 'transfer',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ name: '_governance', type: 'address' }],
      name: 'setGovernance',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }],
      name: 'allowance',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [{ name: '', type: 'address' }],
      name: 'minters',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' }, {
      anonymous: false,
      inputs: [{ indexed: true, name: 'from', type: 'address' }, {
        indexed: true,
        name: 'to',
        type: 'address'
      }, { indexed: false, name: 'value', type: 'uint256' }],
      name: 'Transfer',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, name: 'owner', type: 'address' }, {
        indexed: true,
        name: 'spender',
        type: 'address'
      }, { indexed: false, name: 'value', type: 'uint256' }],
      name: 'Approval',
      type: 'event'
    }],
  coin_abi_USDT: [{ constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ name: '_upgradedAddress', type: 'address' }], name: 'deprecate', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'approve', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'deprecated', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ name: '_evilUser', type: 'address' }], name: 'addBlackList', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'totalSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ name: '_from', type: 'address' }, { name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transferFrom', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'upgradedAddress', outputs: [{ name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }], name: 'balances', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'maximumFee', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: '_totalSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'unpause', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [{ name: '_maker', type: 'address' }], name: 'getBlackListStatus', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }, { name: '', type: 'address' }], name: 'allowed', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'paused', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ name: 'who', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'pause', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'getOwner', outputs: [{ name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transfer', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ name: 'newBasisPoints', type: 'uint256' }, { name: 'newMaxFee', type: 'uint256' }], name: 'setParams', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ name: 'amount', type: 'uint256' }], name: 'issue', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ name: 'amount', type: 'uint256' }], name: 'redeem', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }], name: 'allowance', outputs: [{ name: 'remaining', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'basisPointsRate', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ name: '', type: 'address' }], name: 'isBlackListed', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ name: '_clearedUser', type: 'address' }], name: 'removeBlackList', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'MAX_UINT', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ name: 'newOwner', type: 'address' }], name: 'transferOwnership', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ name: '_blackListedUser', type: 'address' }], name: 'destroyBlackFunds', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ name: '_initialSupply', type: 'uint256' }, { name: '_name', type: 'string' }, { name: '_symbol', type: 'string' }, { name: '_decimals', type: 'uint256' }], payable: false, stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [{ indexed: false, name: 'amount', type: 'uint256' }], name: 'Issue', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: 'amount', type: 'uint256' }], name: 'Redeem', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: 'newAddress', type: 'address' }], name: 'Deprecate', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: 'feeBasisPoints', type: 'uint256' }, { indexed: false, name: 'maxFee', type: 'uint256' }], name: 'Params', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: '_blackListedUser', type: 'address' }, { indexed: false, name: '_balance', type: 'uint256' }], name: 'DestroyedBlackFunds', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: '_user', type: 'address' }], name: 'AddedBlackList', type: 'event' }, { anonymous: false, inputs: [{ indexed: false, name: '_user', type: 'address' }], name: 'RemovedBlackList', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'owner', type: 'address' }, { indexed: true, name: 'spender', type: 'address' }, { indexed: false, name: 'value', type: 'uint256' }], name: 'Approval', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'from', type: 'address' }, { indexed: true, name: 'to', type: 'address' }, { indexed: false, name: 'value', type: 'uint256' }], name: 'Transfer', type: 'event' }, { anonymous: false, inputs: [], name: 'Pause', type: 'event' }, { anonymous: false, inputs: [], name: 'Unpause', type: 'event' }],
  coin_vault_machine_USDT: [{ inputs: [{ internalType: 'address', name: '_token', type: 'address' }, { internalType: 'uint256', name: '_earnLowerlimit', type: 'uint256' }], payable: false, stateMutability: 'nonpayable', type: 'constructor' }, { constant: true, inputs: [], name: 'YFToken', outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'available', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'balance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'address', name: 'user', type: 'address' }], name: 'cal_out', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'uint256', name: '_pendingBalance', type: 'uint256' }, { internalType: 'address', name: 'user', type: 'address' }], name: 'cal_out_pending', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'claim', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'controller', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'deposit', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'deposittime', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'earn', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'earnLowerlimit', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'getName', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], name: 'global_', outputs: [{ internalType: 'uint256', name: 'total_stake', type: 'uint256' }, { internalType: 'uint256', name: 'total_out', type: 'uint256' }, { internalType: 'uint256', name: 'earnings_per_share', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'governance', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'make_profit', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'max', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'min', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'player_', outputs: [{ internalType: 'uint256', name: 'stake', type: 'uint256' }, { internalType: 'uint256', name: 'payout', type: 'uint256' }, { internalType: 'uint256', name: 'total_out', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_controller', type: 'address' }], name: 'setController', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: '_earnLowerlimit', type: 'uint256' }], name: 'setEarnLowerlimit', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_governance', type: 'address' }], name: 'setGovernance', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: '_min', type: 'uint256' }], name: 'setMin', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_token', type: 'address' }], name: 'setToken', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'token', outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'withdraw', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'yf', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }],
  coin_vault_machine_ETH: [{ inputs: [{ internalType: 'address', name: '_token', type: 'address' }], payable: false, stateMutability: 'nonpayable', type: 'constructor' }, { payable: true, stateMutability: 'payable', type: 'fallback' }, { constant: true, inputs: [], name: 'YFToken', outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'available', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'balance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'address', name: 'user', type: 'address' }], name: 'cal_out', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'uint256', name: '_pendingBalance', type: 'uint256' }, { internalType: 'address', name: 'user', type: 'address' }], name: 'cal_out_pending', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'claim', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'controller', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'deposit', outputs: [], payable: true, stateMutability: 'payable', type: 'function' }, { constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'deposittime', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'earn', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'earnLowerlimit', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'getName', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], name: 'global_', outputs: [{ internalType: 'uint256', name: 'total_stake', type: 'uint256' }, { internalType: 'uint256', name: 'total_out', type: 'uint256' }, { internalType: 'uint256', name: 'earnings_per_share', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'governance', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'make_profit', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'max', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'min', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'player_', outputs: [{ internalType: 'uint256', name: 'stake', type: 'uint256' }, { internalType: 'uint256', name: 'payout', type: 'uint256' }, { internalType: 'uint256', name: 'total_out', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_controller', type: 'address' }], name: 'setController', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: '_earnLowerlimit', type: 'uint256' }], name: 'setEarnLowerlimit', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_governance', type: 'address' }], name: 'setGovernance', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: '_min', type: 'uint256' }], name: 'setMin', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_token', type: 'address' }], name: 'setToken', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'token', outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'withdraw', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'yf', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }],
  abi_machine_strategy: [{ inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' }, { constant: true, inputs: [], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'balanceOfD', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'balanceOfPool', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'balanceOfWant', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'burnAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'burnfee', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'callfee', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'controller', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'd', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'deposit', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'df', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'doApprove', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'fee', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'getExchangeRate', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'getName', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'governance', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'harvest', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'max', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'output', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'pool', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_burnAddress', type: 'address' }], name: 'setBurnAddress', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: '_fee', type: 'uint256' }], name: 'setBurnFee', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: '_fee', type: 'uint256' }], name: 'setCallFee', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_controller', type: 'address' }], name: 'setController', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: '_fee', type: 'uint256' }], name: 'setFee', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: '_governance', type: 'address' }], name: 'setGovernance', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: '_withdrawalFee', type: 'uint256' }], name: 'setWithdrawalFee', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], name: 'swap2YFRouting', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'unirouter', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'want', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'weth', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }], name: 'withdraw', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'contract IERC20', name: '_asset', type: 'address' }], name: 'withdraw', outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [], name: 'withdrawAll', outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'withdrawalFee', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'withdrawalMax', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'yf', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'ysr', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }],
  coin_abi_UNIV2: [
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'owner', type: 'address' }, {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address'
      }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }],
      name: 'Approval',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'sender', type: 'address' }, {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256'
      }, { indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256' }, {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      }],
      name: 'Burn',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'sender', type: 'address' }, {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256'
      }, { indexed: false, internalType: 'uint256', name: 'amount1', type: 'uint256' }],
      name: 'Mint',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'sender', type: 'address' }, {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0In',
        type: 'uint256'
      }, { indexed: false, internalType: 'uint256', name: 'amount1In', type: 'uint256' }, {
        indexed: false,
        internalType: 'uint256',
        name: 'amount0Out',
        type: 'uint256'
      }, { indexed: false, internalType: 'uint256', name: 'amount1Out', type: 'uint256' }, {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      }],
      name: 'Swap',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: false, internalType: 'uint112', name: 'reserve0', type: 'uint112' }, {
        indexed: false,
        internalType: 'uint112',
        name: 'reserve1',
        type: 'uint112'
      }],
      name: 'Sync',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'from', type: 'address' }, {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      }, { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }],
      name: 'Transfer',
      type: 'event'
    }, {
      constant: true,
      inputs: [],
      name: 'DOMAIN_SEPARATOR',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'MINIMUM_LIQUIDITY',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'PERMIT_TYPEHASH',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }, {
        internalType: 'address',
        name: '',
        type: 'address'
      }],
      name: 'allowance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'address', name: 'spender', type: 'address' }, {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }],
      name: 'approve',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
      name: 'burn',
      outputs: [{ internalType: 'uint256', name: 'amount0', type: 'uint256' }, {
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256'
      }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'factory',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'getReserves',
      outputs: [{ internalType: 'uint112', name: '_reserve0', type: 'uint112' }, {
        internalType: 'uint112',
        name: '_reserve1',
        type: 'uint112'
      }, { internalType: 'uint32', name: '_blockTimestampLast', type: 'uint32' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'address', name: '_token0', type: 'address' }, {
        internalType: 'address',
        name: '_token1',
        type: 'address'
      }],
      name: 'initialize',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'kLast',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
      name: 'mint',
      outputs: [{ internalType: 'uint256', name: 'liquidity', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'nonces',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }, {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      }, { internalType: 'uint256', name: 'value', type: 'uint256' }, {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256'
      }, { internalType: 'uint8', name: 'v', type: 'uint8' }, {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32'
      }, { internalType: 'bytes32', name: 's', type: 'bytes32' }],
      name: 'permit',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'price0CumulativeLast',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'price1CumulativeLast',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
      name: 'skim',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'amount0Out', type: 'uint256' }, {
        internalType: 'uint256',
        name: 'amount1Out',
        type: 'uint256'
      }, { internalType: 'address', name: 'to', type: 'address' }, {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }],
      name: 'swap',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [],
      name: 'sync',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'token0',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'token1',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'address', name: 'to', type: 'address' }, {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      }],
      name: 'transfer',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'address', name: 'from', type: 'address' }, {
        internalType: 'address',
        name: 'to',
        type: 'address'
      }, { internalType: 'uint256', name: 'value', type: 'uint256' }],
      name: 'transferFrom',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }],
  abi_reaword_pol: [
    {
      anonymous: false,
      inputs: [{
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      }, { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'OwnershipTransferred',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: false, internalType: 'uint256', name: 'reward', type: 'uint256' }],
      name: 'RewardAdded',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'user', type: 'address' }, {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256'
      }],
      name: 'RewardPaid',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'user', type: 'address' }, {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }],
      name: 'Staked',
      type: 'event'
    }, {
      anonymous: false,
      inputs: [{ indexed: true, internalType: 'address', name: 'user', type: 'address' }, {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }],
      name: 'Withdrawn',
      type: 'event'
    }, {
      constant: true,
      inputs: [],
      name: 'DURATION',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'earned',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [],
      name: 'exit',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: false,
      inputs: [],
      name: 'getReward',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'initreward',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'isOwner',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'lastTimeRewardApplicable',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'lastUpdateTime',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'reward', type: 'uint256' }],
      name: 'notifyRewardAmount',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'periodFinish',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'rewardPerToken',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'rewardPerTokenStored',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'rewardRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'rewards',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'address', name: '_rewardDistribution', type: 'address' }],
      name: 'setRewardDistribution',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      name: 'stake',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'starttime',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'u2',
      outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'userRewardPerTokenPaid',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }, {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      name: 'withdraw',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }, {
      constant: true,
      inputs: [],
      name: 'yfi',
      outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }]
}
export default COIN_ABI
