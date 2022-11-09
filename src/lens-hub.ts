import { log } from "@graphprotocol/graph-ts";
import {
	Approval as ApprovalEvent,
	ApprovalForAll as ApprovalForAllEvent,
	Collected,
	CommentCreated,
	MirrorCreated,
	PostCreated,
	ProfileCreated,
	Transfer as TransferEvent,
} from "../generated/LensHub/LensHub";
import {
	Approval,
	ApprovalForAll,
	Comment,
	Mirror,
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
		profile.handle = event.params.handle.toString();
		profile.creator = event.params.creator.toHexString();
		profile.mintedTo = event.params.to.toHexString();
		profile.picture = event.params.imageURI.toString();

		profile.createdAt = event.params.timestamp.toString();

		// Newly set follow module, can be zero address
		profile.followModule = event.params.followModule.toHexString();
		profile.followModuleReturnData = event.params.followModuleReturnData;

		profile.followNftUri = event.params.followNFTURI;

		profile.save();
	}
}

export function handlePostCreated(event: PostCreated): void {
	let post = Post.load(event.params.pubId.toString());

	if (!post) {
		post = new Post(event.params.pubId.toString());
		post.id = event.params.pubId.toString();
		post.contentUri = event.params.contentURI;
		post.createdAt = event.params.timestamp.toString();
		post.profile = event.params.profileId.toString();

		post.collectModule = event.params.collectModule.toHexString();
		post.collectModuleReturnData = event.params.collectModuleReturnData;

		post.referenceModule = event.params.referenceModule.toHexString();
		post.referenceModuleReturnData = event.params.referenceModuleReturnData;

		post.save();
	}

	let profile = Profile.load(event.params.profileId.toString());
	if (profile) {
		profile.posts = (profile.posts ?? []).concat([post.id]);
		profile.save();
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

	let profile = Profile.load(event.params.profileId.toString());
	if (profile) {
		profile.comments = (profile.comments ?? []).concat([comment.id]);
		profile.save();
	}
}

export function handleMirrorCreated(event: MirrorCreated): void {
	let mirror = Mirror.load(event.params.pubId.toString());

	if (!mirror) {
		mirror = new Mirror(event.params.pubId.toString());
		mirror.profile = event.params.profileId.toString();
		mirror.profilePointed = event.params.profileIdPointed.toString();
		mirror.createdAt = event.params.timestamp.toString();

		mirror.referenceModule = event.params.referenceModule.toString();
		mirror.referenceModuleReturnData = event.params.referenceModuleReturnData;
		mirror.publicationPointed = event.params.pubIdPointed.toString();
		mirror.save();
	}

	// Add publication mirrors
	let post = Post.load(event.params.pubIdPointed.toString());
	if (post) {
		post.mirrors = (post.mirrors ?? []).concat([event.params.pubId.toString()]);
	}

	let comment = Comment.load(event.params.pubIdPointed.toString());
	if (comment) {
		comment.mirrors = (comment.mirrors ?? []).concat([
			event.params.pubId.toString(),
		]);
	}
}

// https://docs.lens.xyz/docs/events#collected
export function handleCollected(event: Collected): void {
	// TODO: Unsure to use "pubId" or "rootPubId" here

	let post = Post.load(event.params.pubId.toString());
	if (post) {
		post.collectedBy = event.params.collector.toHexString();
		post.save();
	}

	let comment = Comment.load(event.params.pubId.toString());
	if (comment) {
		comment.collectedBy = event.params.collector.toHexString();
		comment.save();
	}

	let mirror = Mirror.load(event.params.pubId.toString());
	if (mirror) {
		mirror.collectedBy = event.params.collector.toHexString();
		mirror.save();
	}
}
