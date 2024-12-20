# Example mods for the 7 Days to Die web dashboard

This repository contains a number of example mods for the 7D2D web dashboard. The repo also contains tooling to build production-grade bundles of the source code.

## Getting started

Every mod must have a `index.js` file. This is the main entrypoint. See the examples for the general structure.

Each mod can create new pages (eg the inspirational-quotes mod) and/or they can add widgets to the map (eg the markers mod).

## Building your own mod

The folder `mod-builder` contains logic to take raw source code and bundle it up in a way so that the webdashboard can use it. The script will take all folders in the `mods` directory and bundle them up separately.

Ensure you have nodejs and npm installed first. The scripts have been tested with Node 16 and 18 (and their accompanying npm versions)

```sh

# Install the required dependencies
npm ci
# Then build the mods
npm run build:mods
```

To build your own mod, make a new folder in the `mods` directory and add your source code. Then run the build script. Your built files will be in the build folder, eg `mods/inspirational-quotes/build`
