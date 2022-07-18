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

