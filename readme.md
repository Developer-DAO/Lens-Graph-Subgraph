# Lens Subgraph

This is the on-going project for Lens-Protocol subgraph by DeveloperDAO. Championed by: [@nazeeh](https://twitter.com/Nazeeh21) and [@agustinarg.eth](https://twitter.com/PDog355).

This project is Open Source and will remain that way. Feel free to use it.

## Schema 

[This resource](https://docs.lens.xyz/docs/introduction) is useful to understand what we are trying to accomplish.

Lens already has a centralized API and we are trying to reproduce the entities we see there.

## ABIs

We are using the *mumbai* contracts deployed on the following addresses:

LensHub Proxy: 0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d

LensHub Implementation:	0xDd7047d6A8B02595c55DDF01c5934B10D7e03873

## Workflow

The idea I have for working this project in a simultaneous way between team members is that we can create as many entities as needed first and write the cards for the implementation on the `mapping.ts` file. That way we will be able to compose time.

The correct way to write the schema will be to go to Lens Docs, grab a module, read the contract and write a high level entity. Once we make progress with it, we will be able to refine them and create childs in order to have a more granular data model. 

## Source Control

Once you've written an entity or an event handler, feel free to create a branch with the name of the entity you are working with. If the entity was already created and you are working on the mapping, please add the mapping tag as the last work of the branch. 

Example: `entity-post` => `entity-post-mapping`

## Installation

To clone this repo run `git clone` 

To commit on a new branch after creating an entity run `graph codegen`
