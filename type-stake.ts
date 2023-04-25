import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Contract, junokitTypes } from "junokit";
import { StdFee, Coin } from "@cosmjs/amino";
export type ExecuteMsg = {
  stake: {
    referral: number;
    [k: string]: unknown;
  };
} | {
  stake_for_bjuno: {
    referral: number;
    [k: string]: unknown;
  };
} | {
  claim: {
    [k: string]: unknown;
  };
} | {
  claim_and_stake: {
    [k: string]: unknown;
  };
} | {
  update_sejuno_addr: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  update_bjuno_addr: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  update_validator_set_addr: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  update_rewards_addr: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  receive: Cw20ReceiveMsg;
} | {
  advance_window: {
    [k: string]: unknown;
  };
} | {
  rebalance_slash: {
    [k: string]: unknown;
  };
} | {
  pause_contract: {
    [k: string]: unknown;
  };
} | {
  unpause_contract: {
    [k: string]: unknown;
  };
} | {
  vote_on_chain: {
    proposal: number;
    vote: VoteOption;
    [k: string]: unknown;
  };
} | {
  remove_validator: {
    address: string;
    redelegate?: boolean | null;
    [k: string]: unknown;
  };
} | {
  add_validator: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  redelegate: {
    from: string;
    to: string;
    [k: string]: unknown;
  };
} | {
  change_owner: {
    new_owner: Addr;
    [k: string]: unknown;
  };
} | {
  recover_juno: {
    amount: Uint128;
    denom: string;
    to: string;
    [k: string]: unknown;
  };
} | {
  kill_switch_unbond: {
    [k: string]: unknown;
  };
} | {
  kill_switch_open_withdraws: {
    [k: string]: unknown;
  };
} | {
  change_unbonding_time: {
    new_time: number;
    [k: string]: unknown;
  };
} | {
  change_dev_fee: {
    dev_address?: Addr | null;
    dev_fee?: number | null;
    [k: string]: unknown;
  };
} | {
  change_peg_recovery_fee: {
    peg_recovery_fee: number;
    [k: string]: unknown;
  };
} | {
  change_threshold: {
    er_threshold: number;
    [k: string]: unknown;
  };
} | {
  claim_airdrop1: {
    address: Addr;
    amount: Uint128;
    proof: string[];
    stage: number;
    [k: string]: unknown;
  };
} | {
  claim_airdrop2: {
    address: Addr;
    amount: Uint128;
    proof: string[];
    [k: string]: unknown;
  };
} | {
  claim_airdrop3: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  claim_reward: {
    [k: string]: unknown;
  };
} | {
  change_referral_contract: {
    referral_contract: Addr;
    [k: string]: unknown;
  };
} | {
  remove_old_window_data: {
    window: number;
    [k: string]: unknown;
  };
} | {
  remove_old_claim_data: {
    [k: string]: unknown;
  };
} | {
  remove_old_queue_data: {
    [k: string]: unknown;
  };
};
export type Addr = string;
export type Uint128 = string;
export type Binary = string;
export type VoteOption = "yes" | "no" | "abstain" | "no_with_veto";
export interface Cw20ReceiveMsg {
  amount: Uint128;
  msg: Binary;
  sender: string;
  [k: string]: unknown;
}
export interface InstantiateMsg {
  dev_address: Addr;
  dev_fee?: number | null;
  epoch_period: number;
  er_threshold: number;
  peg_recovery_fee: number;
  reward_denom: string;
  unbonding_period: number;
  underlying_coin_denom: string;
  [k: string]: unknown;
}
export interface PendingClaimsResponse {
  claim_time: number;
  juno_amount: Uint128;
  window_id: number;
  [k: string]: unknown;
}
export type QueryMsg = {
  sejuno_exchange_rate: {
    [k: string]: unknown;
  };
} | {
  bjuno_exchange_rate: {
    [k: string]: unknown;
  };
} | {
  query_dev_fee: {
    [k: string]: unknown;
  };
} | {
  info: {
    [k: string]: unknown;
  };
} | {
  undelegations: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  user_claimable: {
    address: Addr;
    [k: string]: unknown;
  };
} | {
  window: {
    [k: string]: unknown;
  };
} | {
  validator_list: {
    [k: string]: unknown;
  };
} | {
  active_unbonding: {
    address: Addr;
    [k: string]: unknown;
  };
};
export type QueryResponse = {
  info: {
    admin: Addr;
    bjuno_backing: Uint128;
    bjuno_in_contract: Uint128;
    bjuno_to_burn: Uint128;
    bjuno_token: Addr;
    dev_address: Addr;
    dev_fee: number;
    epoch_period: number;
    er_threshold: number;
    juno_under_withdraw: Uint128;
    kill_switch: number;
    peg_recovery_fee: number;
    reward_denom: string;
    rewards_contract: Addr;
    sejuno_backing: Uint128;
    sejuno_in_contract: Uint128;
    sejuno_to_burn: Uint128;
    sejuno_token: Addr;
    to_deposit: Uint128;
    top_validator_contract: Addr;
    total_staked: Uint128;
    unbonding_period: number;
    underlying_coin_denom: string;
    validator_set: ValidatorResponse[];
    [k: string]: unknown;
  };
} | {
  pending_claims: {
    pending: PendingClaimsResponse[];
    [k: string]: unknown;
  };
} | {
  active_undelegation: {
    bjuno_amount: Uint128;
    sejuno_amount: Uint128;
    [k: string]: unknown;
  };
} | {
  top_validators: {
    validators: string[];
    [k: string]: unknown;
  };
} | {
  sejuno_exchange_rate: {
    denom: string;
    rate: string;
    [k: string]: unknown;
  };
} | {
  bjuno_exchange_rate: {
    denom: string;
    rate: string;
    [k: string]: unknown;
  };
} | {
  dev_fee: {
    address: Addr;
    fee: number;
    [k: string]: unknown;
  };
} | {
  window: {
    bjuno_amount: Uint128;
    id: number;
    sejuno_amount: Uint128;
    time_to_close: number;
    [k: string]: unknown;
  };
} | {
  unbonding: {
    unbonding_amount: Uint128;
    [k: string]: unknown;
  };
} | {
  claimable: {
    claimable_amount: Uint128;
    [k: string]: unknown;
  };
};
export interface ValidatorResponse {
  address: string;
  staked: Uint128;
  [k: string]: unknown;
}
export interface TopValidatorsResponse {
  validators: string[];
  [k: string]: unknown;
}
export interface StakingContractReadOnlyInterface {
  sejunoExchangeRate: () => Promise<any>;
  bjunoExchangeRate: () => Promise<any>;
  queryDevFee: () => Promise<any>;
  info: () => Promise<any>;
  undelegations: ({
    address
  }: {
    address: Addr;
  }) => Promise<any>;
  userClaimable: ({
    address
  }: {
    address: Addr;
  }) => Promise<any>;
  window: () => Promise<any>;
  validatorList: () => Promise<any>;
  activeUnbonding: ({
    address
  }: {
    address: Addr;
  }) => Promise<any>;
}
export class StakingContractQueryContract extends Contract implements StakingContractReadOnlyInterface {
  constructor(contractName: string) {
    super(contractName);
    this.sejunoExchangeRate = this.sejunoExchangeRate.bind(this);
    this.bjunoExchangeRate = this.bjunoExchangeRate.bind(this);
    this.queryDevFee = this.queryDevFee.bind(this);
    this.info = this.info.bind(this);
    this.undelegations = this.undelegations.bind(this);
    this.userClaimable = this.userClaimable.bind(this);
    this.window = this.window.bind(this);
    this.validatorList = this.validatorList.bind(this);
    this.activeUnbonding = this.activeUnbonding.bind(this);
  }
  sejunoExchangeRate = async (): Promise<any> => {
    return this.queryMsg({
      sejuno_exchange_rate: {}
    });
  };
  bjunoExchangeRate = async (): Promise<any> => {
    return this.queryMsg({
      bjuno_exchange_rate: {}
    });
  };
  queryDevFee = async (): Promise<any> => {
    return this.queryMsg({
      query_dev_fee: {}
    });
  };
  info = async (): Promise<any> => {
    return this.queryMsg({
      info: {}
    });
  };
  undelegations = async ({
    address
  }: {
    address: Addr;
  }): Promise<any> => {
    return this.queryMsg({
      undelegations: {
        address
      }
    });
  };
  userClaimable = async ({
    address
  }: {
    address: Addr;
  }): Promise<any> => {
    return this.queryMsg({
      user_claimable: {
        address
      }
    });
  };
  window = async (): Promise<any> => {
    return this.queryMsg({
      window: {}
    });
  };
  validatorList = async (): Promise<any> => {
    return this.queryMsg({
      validator_list: {}
    });
  };
  activeUnbonding = async ({
    address
  }: {
    address: Addr;
  }): Promise<any> => {
    return this.queryMsg({
      active_unbonding: {
        address
      }
    });
  };
}
export interface StakingContractInterface extends StakingContractReadOnlyInterface {
  stake: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    referral
  }: {
    referral: number;
  }) => Promise<any>;
  stakeForBjuno: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    referral
  }: {
    referral: number;
  }) => Promise<any>;
  claim: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  claimAndStake: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  updateSejunoAddr: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }) => Promise<any>;
  updateBjunoAddr: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }) => Promise<any>;
  updateValidatorSetAddr: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }) => Promise<any>;
  updateRewardsAddr: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }) => Promise<any>;
  receive: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  advanceWindow: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  rebalanceSlash: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  pauseContract: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  unpauseContract: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  voteOnChain: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    proposal,
    vote
  }: {
    proposal: number;
    vote: VoteOption;
  }) => Promise<any>;
  removeValidator: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address,
    redelegate
  }: {
    address: string;
    redelegate?: boolean;
  }) => Promise<any>;
  addValidator: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }) => Promise<any>;
  redelegate: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    from,
    to
  }: {
    from: string;
    to: string;
  }) => Promise<any>;
  changeOwner: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    newOwner
  }: {
    newOwner: Addr;
  }) => Promise<any>;
  recoverJuno: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    amount,
    denom,
    to
  }: {
    amount: Uint128;
    denom: string;
    to: string;
  }) => Promise<any>;
  killSwitchUnbond: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  killSwitchOpenWithdraws: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  changeUnbondingTime: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    newTime
  }: {
    newTime: number;
  }) => Promise<any>;
  changeDevFee: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    devAddress,
    devFee
  }: {
    devAddress?: Addr;
    devFee?: number;
  }) => Promise<any>;
  changePegRecoveryFee: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    pegRecoveryFee
  }: {
    pegRecoveryFee: number;
  }) => Promise<any>;
  changeThreshold: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    erThreshold
  }: {
    erThreshold: number;
  }) => Promise<any>;
  claimAirdrop1: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address,
    amount,
    proof,
    stage
  }: {
    address: Addr;
    amount: Uint128;
    proof: string[];
    stage: number;
  }) => Promise<any>;
  claimAirdrop2: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address,
    amount,
    proof
  }: {
    address: Addr;
    amount: Uint128;
    proof: string[];
  }) => Promise<any>;
  claimAirdrop3: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }) => Promise<any>;
  claimReward: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  changeReferralContract: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    referralContract
  }: {
    referralContract: Addr;
  }) => Promise<any>;
  removeOldWindowData: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    window
  }: {
    window: number;
  }) => Promise<any>;
  removeOldClaimData: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
  removeOldQueueData: ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }) => Promise<any>;
}
export class StakingContractContract extends StakingContractQueryContract implements StakingContractInterface {
  constructor() {
    super("staking_contract");
    this.stake = this.stake.bind(this);
    this.stakeForBjuno = this.stakeForBjuno.bind(this);
    this.claim = this.claim.bind(this);
    this.claimAndStake = this.claimAndStake.bind(this);
    this.updateSejunoAddr = this.updateSejunoAddr.bind(this);
    this.updateBjunoAddr = this.updateBjunoAddr.bind(this);
    this.updateValidatorSetAddr = this.updateValidatorSetAddr.bind(this);
    this.updateRewardsAddr = this.updateRewardsAddr.bind(this);
    this.receive = this.receive.bind(this);
    this.advanceWindow = this.advanceWindow.bind(this);
    this.rebalanceSlash = this.rebalanceSlash.bind(this);
    this.pauseContract = this.pauseContract.bind(this);
    this.unpauseContract = this.unpauseContract.bind(this);
    this.voteOnChain = this.voteOnChain.bind(this);
    this.removeValidator = this.removeValidator.bind(this);
    this.addValidator = this.addValidator.bind(this);
    this.redelegate = this.redelegate.bind(this);
    this.changeOwner = this.changeOwner.bind(this);
    this.recoverJuno = this.recoverJuno.bind(this);
    this.killSwitchUnbond = this.killSwitchUnbond.bind(this);
    this.killSwitchOpenWithdraws = this.killSwitchOpenWithdraws.bind(this);
    this.changeUnbondingTime = this.changeUnbondingTime.bind(this);
    this.changeDevFee = this.changeDevFee.bind(this);
    this.changePegRecoveryFee = this.changePegRecoveryFee.bind(this);
    this.changeThreshold = this.changeThreshold.bind(this);
    this.claimAirdrop1 = this.claimAirdrop1.bind(this);
    this.claimAirdrop2 = this.claimAirdrop2.bind(this);
    this.claimAirdrop3 = this.claimAirdrop3.bind(this);
    this.claimReward = this.claimReward.bind(this);
    this.changeReferralContract = this.changeReferralContract.bind(this);
    this.removeOldWindowData = this.removeOldWindowData.bind(this);
    this.removeOldClaimData = this.removeOldClaimData.bind(this);
    this.removeOldQueueData = this.removeOldQueueData.bind(this);
  }
  stake = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    referral
  }: {
    referral: number;
  }): Promise<any> => {
    return await this.executeMsg({
      stake: {
        referral
      }
    }, account, customFees, memo, transferAmount);
  };
  stakeForBjuno = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    referral
  }: {
    referral: number;
  }): Promise<any> => {
    return await this.executeMsg({
      stake_for_bjuno: {
        referral
      }
    }, account, customFees, memo, transferAmount);
  };
  claim = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      claim: {}
    }, account, customFees, memo, transferAmount);
  };
  claimAndStake = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      claim_and_stake: {}
    }, account, customFees, memo, transferAmount);
  };
  updateSejunoAddr = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }): Promise<any> => {
    return await this.executeMsg({
      update_sejuno_addr: {
        address
      }
    }, account, customFees, memo, transferAmount);
  };
  updateBjunoAddr = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }): Promise<any> => {
    return await this.executeMsg({
      update_bjuno_addr: {
        address
      }
    }, account, customFees, memo, transferAmount);
  };
  updateValidatorSetAddr = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }): Promise<any> => {
    return await this.executeMsg({
      update_validator_set_addr: {
        address
      }
    }, account, customFees, memo, transferAmount);
  };
  updateRewardsAddr = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }): Promise<any> => {
    return await this.executeMsg({
      update_rewards_addr: {
        address
      }
    }, account, customFees, memo, transferAmount);
  };
  receive = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      receive: {}
    }, account, customFees, memo, transferAmount);
  };
  advanceWindow = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      advance_window: {}
    }, account, customFees, memo, transferAmount);
  };
  rebalanceSlash = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      rebalance_slash: {}
    }, account, customFees, memo, transferAmount);
  };
  pauseContract = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      pause_contract: {}
    }, account, customFees, memo, transferAmount);
  };
  unpauseContract = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      unpause_contract: {}
    }, account, customFees, memo, transferAmount);
  };
  voteOnChain = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    proposal,
    vote
  }: {
    proposal: number;
    vote: VoteOption;
  }): Promise<any> => {
    return await this.executeMsg({
      vote_on_chain: {
        proposal,
        vote
      }
    }, account, customFees, memo, transferAmount);
  };
  removeValidator = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address,
    redelegate
  }: {
    address: string;
    redelegate?: boolean;
  }): Promise<any> => {
    return await this.executeMsg({
      remove_validator: {
        address,
        redelegate
      }
    }, account, customFees, memo, transferAmount);
  };
  addValidator = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }): Promise<any> => {
    return await this.executeMsg({
      add_validator: {
        address
      }
    }, account, customFees, memo, transferAmount);
  };
  redelegate = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    from,
    to
  }: {
    from: string;
    to: string;
  }): Promise<any> => {
    return await this.executeMsg({
      redelegate: {
        from,
        to
      }
    }, account, customFees, memo, transferAmount);
  };
  changeOwner = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    newOwner
  }: {
    newOwner: Addr;
  }): Promise<any> => {
    return await this.executeMsg({
      change_owner: {
        new_owner: newOwner
      }
    }, account, customFees, memo, transferAmount);
  };
  recoverJuno = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    amount,
    denom,
    to
  }: {
    amount: Uint128;
    denom: string;
    to: string;
  }): Promise<any> => {
    return await this.executeMsg({
      recover_juno: {
        amount,
        denom,
        to
      }
    }, account, customFees, memo, transferAmount);
  };
  killSwitchUnbond = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      kill_switch_unbond: {}
    }, account, customFees, memo, transferAmount);
  };
  killSwitchOpenWithdraws = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      kill_switch_open_withdraws: {}
    }, account, customFees, memo, transferAmount);
  };
  changeUnbondingTime = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    newTime
  }: {
    newTime: number;
  }): Promise<any> => {
    return await this.executeMsg({
      change_unbonding_time: {
        new_time: newTime
      }
    }, account, customFees, memo, transferAmount);
  };
  changeDevFee = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    devAddress,
    devFee
  }: {
    devAddress?: Addr;
    devFee?: number;
  }): Promise<any> => {
    return await this.executeMsg({
      change_dev_fee: {
        dev_address: devAddress,
        dev_fee: devFee
      }
    }, account, customFees, memo, transferAmount);
  };
  changePegRecoveryFee = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    pegRecoveryFee
  }: {
    pegRecoveryFee: number;
  }): Promise<any> => {
    return await this.executeMsg({
      change_peg_recovery_fee: {
        peg_recovery_fee: pegRecoveryFee
      }
    }, account, customFees, memo, transferAmount);
  };
  changeThreshold = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    erThreshold
  }: {
    erThreshold: number;
  }): Promise<any> => {
    return await this.executeMsg({
      change_threshold: {
        er_threshold: erThreshold
      }
    }, account, customFees, memo, transferAmount);
  };
  claimAirdrop1 = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address,
    amount,
    proof,
    stage
  }: {
    address: Addr;
    amount: Uint128;
    proof: string[];
    stage: number;
  }): Promise<any> => {
    return await this.executeMsg({
      claim_airdrop1: {
        address,
        amount,
        proof,
        stage
      }
    }, account, customFees, memo, transferAmount);
  };
  claimAirdrop2 = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address,
    amount,
    proof
  }: {
    address: Addr;
    amount: Uint128;
    proof: string[];
  }): Promise<any> => {
    return await this.executeMsg({
      claim_airdrop2: {
        address,
        amount,
        proof
      }
    }, account, customFees, memo, transferAmount);
  };
  claimAirdrop3 = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    address
  }: {
    address: Addr;
  }): Promise<any> => {
    return await this.executeMsg({
      claim_airdrop3: {
        address
      }
    }, account, customFees, memo, transferAmount);
  };
  claimReward = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      claim_reward: {}
    }, account, customFees, memo, transferAmount);
  };
  changeReferralContract = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    referralContract
  }: {
    referralContract: Addr;
  }): Promise<any> => {
    return await this.executeMsg({
      change_referral_contract: {
        referral_contract: referralContract
      }
    }, account, customFees, memo, transferAmount);
  };
  removeOldWindowData = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }, {
    window
  }: {
    window: number;
  }): Promise<any> => {
    return await this.executeMsg({
      remove_old_window_data: {
        window
      }
    }, account, customFees, memo, transferAmount);
  };
  removeOldClaimData = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      remove_old_claim_data: {}
    }, account, customFees, memo, transferAmount);
  };
  removeOldQueueData = async ({
    account,
    customFees,
    memo,
    transferAmount
  }: {
    account: junokitTypes.UserAccount;
    customFees?: junokitTypes.TxnStdFee;
    memo?: string;
    transferAmount?: readonly Coin[];
  }): Promise<any> => {
    return await this.executeMsg({
      remove_old_queue_data: {}
    }, account, customFees, memo, transferAmount);
  };
}