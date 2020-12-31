# ESTA Cloud Angular Template

See our changes in the [CHANGELOG.md](./CHANGELOG.md)

[Source Repo](https://code.sbb.ch/projects/KD_ESTA_BLUEPRINTS/repos/esta-cloud-angular/browse)
[ESTA Documentation](https://confluence.sbb.ch/display/CLEW/ESTA-Web)

**--> IMPORTANT: to make the blueprint work you need to properly configure OAuth2. See below. <--**

## OAuth2

OAuth2 (Authorization Code Flow without secret) against Red Hat SSO has been integrated in this blueprint.
To properly configure it see the following documentation: [ESTA SSO Authentication](https://confluence.sbb.ch/display/CLEW/sso.sbb.ch)

After completing your the registration you have to adjust your Angular environment appropriately in `environment.ts`.

## i18n

This project uses [Angular i18n](https://angular.io/guide/i18n) for its internationalization (See src/i18n).
It is configured to use XLIFF 1.2 Files (which can be used with the tools from SBB Translation Service).
To translate the app, either edit the XML files directly or start
[angular-t9n](https://www.npmjs.com/package/angular-t9n) by running the command `npm run t9n` and
opening `http://localhost:4300`.

CLEW Documentation: https://confluence.sbb.ch/x/f4pKXg

Sprachdienst SBB: https://sbb.sharepoint.com/sites/intranet-organisation/de/Seiten/kom-mf-sd.aspx

## IE11

This project uses differential loading, which is the default since Angular 8. This means `ng build` will build two bundles;
one for legacy browsers (like IE11) and one for modern browsers (who require less polyfills).
However with `ng serve` only one bundle is served, which is by default the modern bundle. In order to debug the app on IE11
we provide an es5 configuration, which can be used with `ng serve -c es5`.

## Linting

This project uses [angular-eslint](https://github.com/angular-eslint/angular-eslint) for linting purposes,
which is the recommended replacement for tslint and codelyzer. Use the eslint plugin for
[VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) or for
[IntelliJ](https://www.jetbrains.com/help/idea/eslint.html).

## Prettier

This project is configured with [prettier](https://prettier.io/), which is an opinionated code formatter.
It is integrated in the eslint configuration. Run it with `ng lint --fix` or directly via `npx prettier --write .`.

It is also possible to configure prettier formatting as a [Git Hook](https://prettier.io/docs/en/precommit.html).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Questions/Suggestions

If you have questions or suggestions in regard to this repository, feel free to open a [CLEW issue](https://clew.sbb.ch)
with the Component `ESTA Web`. We appreciate any kind of feedback.
