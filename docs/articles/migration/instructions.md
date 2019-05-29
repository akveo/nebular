# Nebular Migration Instructions

Nebular follows [semantic versioning](https://semver.org/) strategy for the release process.
This means that every Nebular version number could be broken down into the *major.minor.patch* parts, where each of them means:

- **major** - contains significant new features, as well as possible breaking changes. Still each new major version - is an increment of the previous version, not a complete rework or new product.
- **minor** - contains new small features and bug fixes. Minor versions are backward-compatible.
- **patch** - bug fix releases.

## Long time support versions

Starting with Nebular 3 we introduce support policy schedule. 
All major versions will receive 6 months of long-time support (LTS) addressing:

- critical bug fixes
- security fixes
- Angular major version update


## Migration Steps

Installation of the minor and patch version in most of the times won't require any developer assistance during the update, though we recommend following these steps for all cases:

1. Update version in your package.json and run `npm i` or simply run `ng update @nebular/theme@4.0.1`, where `4.0.1` is the desired version.

You may also specify all required Nebular packages during the installation `ng update @nebular/{theme,auth,security}@4.0.1`

2. Check for npm peer-dependency warning, update accordingly.
To update Angular, follow [offician Angular upgrage guide](https://update.angular.io/).

3. Check [Nebular CHANGELOG](https://github.com/akveo/nebular/blob/master/CHANGELOG.md) for list of changes and follow migration instructions, if any. 


## Related Articles

- [Angular Migration Process](https://angular.io/guide/releases)
