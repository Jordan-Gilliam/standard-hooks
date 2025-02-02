# Contributing to standard-hooks

Thank you for taking the time to contribute! Guidelines below are meant to help you along the way. All contributions are welcome, including ideas, tweaks and more.

## Code of Conduct

This project is governed by the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Proposing a change

Before making a non-trivial change, please discuss it via [issues][]. You should begin the title with _[useHookName]_ if applicable.

[issues]: https://github.com/kripod/standard-hooks/issues

## Development process

### Prequisites

- [Node.js](https://nodejs.org/) >=10
- [Yarn](https://yarnpkg.com/) >=1

### Workflow

1. Clone a fork of the `master` branch and install all the required dependencies with `yarn`
2. Make changes to the codebase
3. Before pushing, fix any errors possibly emitted by the following commands:

   - `yarn format` fixes stylistic issues using [Prettier][]
   - `yarn lint` enforces coding rules based on the [Airbnb JavaScript Style Guide][]
   - `yarn test` runs tests found in '\*.test.ts(x)' files

4. Run `yarn doc` if you made documentation changes
5. Open a new pull request, [referencing corresponding issues][] if available

[prettier]: https://prettier.io/
[airbnb javascript style guide]: https://github.com/airbnb/javascript
[referencing corresponding issues]: https://help.github.com/en/articles/closing-issues-using-keywords

## License

As a collaborator, you agree to license your contributions under the project's [MIT license](./LICENSE).
