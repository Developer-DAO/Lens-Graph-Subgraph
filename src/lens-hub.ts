import { log } from "@graphprotocol/graph-ts";
import {
	Approval as ApprovalEvent,
	ApprovalForAll as ApprovalForAllEvent,
	CommentCreated,
	PostCreated,
	ProfileCreated,
	Transfer as TransferEvent,
} from "../generated/LensHub/LensHub";
import {
	Approval,
	ApprovalForAll,
	Comment,
	Post,
	Profile,
	Transfer,
} from "../generated/schema";

export function handleApproval(event: ApprovalEvent): void {
	let entity = new Approval(
		event.transaction.hash.toHex() + "-" + event.logIndex.toString()
	);
	entity.owner = event.params.owner;
	entity.approved = event.params.approved;
	entity.tokenId = event.params.tokenId;
	entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
	let entity = new ApprovalForAll(
		event.transaction.hash.toHex() + "-" + event.logIndex.toString()
	);
	entity.owner = event.params.owner;
	entity.operator = event.params.operator;
	entity.approved = event.params.approved;
	entity.save();
}

export function handleTransfer(event: TransferEvent): void {
	let entity = new Transfer(
		event.transaction.hash.toHex() + "-" + event.logIndex.toString()
	);
	entity.from = event.params.from;
	entity.to = event.params.to;
	entity.tokenId = event.params.tokenId;
	entity.save();
}

export function handleProfileCreated(event: ProfileCreated): void {
	let profile = Profile.load(event.params.profileId.toString());
	log.info("Trigger Fired", []);

	if (!profile) {
		profile = new Profile(event.params.profileId.toString());
		profile.metadata = event.params.followNFTURI;
		profile.handle = event.params.handle;
		profile.onwnedBy = event.params.creator.toHexString();
		profile.isDefault = true;
		profile.isFollowedByMe = false;
		profile.save();
	}
}

export function handlePostCreated(event: PostCreated): void {
	let post = Post.load(event.params.pubId.toString());

	if (!post) {
		post = new Post(event.params.pubId.toString());
		post.id = event.params.pubId.toString();
		post.onChainContentURI = event.params.contentURI;
		post.createdAt = event.params.timestamp.toString();
		post.profile = event.params.profileId.toString();
		post.collectNftAddress = event.params.collectModule.toHexString();
		// post.metadata = event.params.referenceModule
		// post.appId = event.params.referenceModule.toString()
		post.save();
	}
}

export function handleCommentCreated(event: CommentCreated): void {
	let comment = Comment.load(event.params.pubId.toString());

	if (!comment) {
		comment = new Comment(event.params.pubId.toString());
		comment.createdAt = event.params.timestamp.toString();
		comment.profile = event.params.profileId.toString();
		comment.onChainContentURI = event.params.contentURI.toString();

		comment.collectModule = event.params.collectModule.toString();
		comment.referenceModule = event.params.referenceModule.toString();
		comment.publication = event.params.pubIdPointed.toString();
		comment.profilePointed = event.params.profileIdPointed.toString();
		comment.save();
	}
}
