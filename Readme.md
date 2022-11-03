# Lens Protocol Subgraph

This is Subgraph for the [Lens Protocol](https://lens.xyz/).

You can find the subgraph api [here](https://api.thegraph.com/subgraphs/name/nazeeh21/lens-protocol-matic) and can query that using the playground.

**Example query**

```graphql
// This will fetch the profiles of the users
{
  profiles(first: 10) {
    id
    handle
    isFollowedByMe
  }
  _meta {
    block {
      number
    }
  }
}

```

This requires the Lens Protocol Contract to be ingested by the subgraph, with the events that were sourced to be stored in the subgraph database:

- LensHub.sol
  - event ProfileCreated
  - event Transfer
  - event Approval
  - event AprrovalForAll
- TransparentUpgradeableProxy.sol
  - event AdminChanged
  - event BeaconUpgraded
  - event Upgraded

All of the other contracts don't emit events that are relevant for this subgraph.

This can be used for the Mumbai and Polygon Mainnet contracts. In order to do
so the `subgraph.yaml` file will need to have the contract addresses changed to point to the
correct address for each respective network.

Expect the subgraph to take ~10 hours to ingest all the events when connected to infura for mainnet

**Note: Switch to the `feat/index-profile` branch for the most updated code, to deploy the subgraph and to make the contributions.**

**How to deploy**

1. Clone the repository
2. Add a Subgraph in https://thegraph.com/hosted-service/
3. Follow the steps mentioned in the subgraph dashboard to deploy the subgraph.

(Refer to [this](https://dev.to/edge-and-node/building-graphql-apis-on-ethereum-4poa) to know in detail about how to deploy a subgraph)

**Link to the hosted service subgraph :**
https://thegraph.com/hosted-service/subgraph/rtomas/lens-subgraph
(there are some saved queries to play with the subgraph)

---

**Contract from the collection :**
https://polygonscan.com/address/0x20f4D7DdeE23029048C53B42dc73A02De19F1c9E

**Official Website :**
https://lens.xyz/

**Developer Docs**
https://docs.lens.xyz/docs

## Brief Description of the Graph Node Setup

This subgraph has three types of files which tell the Graph Node to ingest events from specific contracts. They are:

- The subgraph manifest (subgraph.yaml)
- A GraphQL schema (schema.graphql)
- Mapping scripts (lens-hub.ts, transparent-upgradeable-proxy.ts)
  This repository has these files created and ready to compile, so a user can start this subgraph on their own. The only thing that needs to be edited is the contract addresses in the subgraph.yaml file to change between Kovan, Ropsten or Mainnet.

We have provided a quick guide on how to start up the Lens-Protocol-Subgraph graph node. If these steps aren't descriptive enough, the [getting started guide](https://github.com/graphprotocol/graph-node/blob/master/docs/getting-started.md) has in depth details on running a subgraph.
