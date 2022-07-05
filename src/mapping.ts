import { BigInt } from "@graphprotocol/graph-ts"
import {
  lensproxy,
  AdminChanged,
  BeaconUpgraded,
  Upgraded
} from "../generated/lensproxy/lensproxy"
import {CollectNFTDeployed, FollowNFTTransferred} from "../generated/LensHub/LensHub"

export function handleAdminChanged(event: AdminChanged): void {
}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleUpgraded(event: Upgraded): void {}

// event handlers for LensHub

export function handleCollectNFTDeployed(event: CollectNFTDeployed): void {

}

export function handleFollowNFTTransferred(event: FollowNFTTransferred): void {

}