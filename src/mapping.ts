import { BigInt } from "@graphprotocol/graph-ts"
import {
  lensproxy,
  AdminChanged,
  BeaconUpgraded,
  Upgraded
} from "../generated/lensproxy/lensproxy"
import {CollectNFTDeployed, FollowNFTTransferred, ProfileCreated} from "../generated/LensHub/LensHub"
import { Profile } from '../generated/schema'

export function handleAdminChanged(event: AdminChanged): void {
}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleUpgraded(event: Upgraded): void {}

// event handlers for LensHub

export function handleCollectNFTDeployed(event: CollectNFTDeployed): void {

}

export function handleFollowNFTTransferred(event: FollowNFTTransferred): void {

}

export function handleProfileCreated(event: ProfileCreated): void {
  let profile = Profile.load(event.params.profileId.toString())
  
  if(!profile) {
    profile = new Profile(event.params.profileId.toString())
    // profile.name = event.params.creator
    // profile.bio = event.params.
    // profile.followNftAddress = event.params.
    profile.metadata = event.params.followNFTURI
    profile.handle = event.params.handle
    profile.onwnedBy = event.params.creator.toHexString()
    profile.isDefault = true
    profile.isFollowedByMe = false
    profile.save()
  }
}