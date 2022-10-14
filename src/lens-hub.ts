import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  ProfileCreated,
  Transfer as TransferEvent
} from "../generated/LensHub/LensHub"
import { Approval, ApprovalForAll, Profile, Transfer } from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.save()
}

export function handleProfileCreated(event: ProfileCreated): void {
  let profile = Profile.load(event.params.profileId.toString())

  if(!profile) {
    profile = new Profile(event.params.profileId.toString())
    profile.metadata = event.params.followNFTURI
    profile.handle = event.params.handle
    profile.ownedBy = event.params.creator.toHexString()
    profile.isDefault = true
    profile.isFollowedByMe = false
    profile.save()
  }
}
