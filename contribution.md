# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the README.md with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you 
   do not have permission to do that, you may request the second reviewer to merge it for you.

## Setup
**How to deploy**

1. Clone the repository from the `feat/index-profile` branch
2. Add a Subgraph in https://thegraph.com/hosted-service/
3. `yarn install` into the subgraph directory
4. `graph auth --product hosted-service <ACCESS_TOKEN>`
5. `yarn deploy`

**Link to the hosted service subgraph :**
https://thegraph.com/hosted-service/subgraph/nazeeh21/lens-protocol-polygon

## Documentation
Links to the tools used in the project are mentaioned below:
- [Graph Protocol](https://thegraph.com/docs/en/developing/creating-a-subgraph/)
- [Lens Protocol](https://lens.xyz/garden)
- [Subgraph API](https://api.thegraph.com/subgraphs/name/nazeeh21/lens-protocol-matic/graphql)
- [GraphQL](https://graphql.org/graphql-js/)

