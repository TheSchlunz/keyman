/*
 * Note:  while this file is not meant to exist long-term, it provides a nice
 * low-level proof-of-concept for esbuild bundling of the various Web submodules.
 *
 * Add some extra code at the end of src/index.ts and run it to verify successful bundling!
 */

import esbuild from 'esbuild';
import { spawn } from 'child_process';

// Browser / namespace-targeted bundle
esbuild.buildSync({
  entryPoints: ['build/obj/index-namespaced.js'],
  bundle: true,
  sourcemap: true,
  minify: true,
  format: "iife",
  keepNames: true,
  // Sets 'common/web' as a root folder for module resolution;
  // this allows the keyman-version and utils imports to resolve.
  //
  // We also need to point it at the nested build output folder to resolve in-project
  // imports when compiled - esbuild doesn't seem to pick up on the shifted base.
  nodePaths: ['..', "build/obj"],
  outfile: "build/lib/index.namespaced.js",
  tsconfig: 'tsconfig.json',
  target: "es5"
});

// Bundled ES module version
esbuild.buildSync({
  entryPoints: ['build/obj/index.js'],
  bundle: true,
  sourcemap: true,
  format: "esm",
  // Sets 'common/web' as a root folder for module resolution;
  // this allows the keyman-version and utils imports to resolve.
  //
  // We also need to point it at the nested build output folder to resolve in-project
  // imports when compiled - esbuild doesn't seem to pick up on the shifted base.
  nodePaths: ['..', "build/obj"],
  outfile: "build/lib/index.mjs",
  tsconfig: 'tsconfig.json',
  target: "es5"
});

// Bundled CommonJS (classic Node) module version
esbuild.buildSync({
  entryPoints: ['build/obj/index.js'],
  bundle: true,
  sourcemap: true,
  format: "cjs",
  // Sets 'common/web' as a root folder for module resolution;
  // this allows the keyman-version and utils imports to resolve.
  //
  // We also need to point it at the nested build output folder to resolve in-project
  // imports when compiled - esbuild doesn't seem to pick up on the shifted base.
  nodePaths: ['..', "build/obj"],
  outfile: "build/lib/index.cjs",
  tsconfig: 'tsconfig.json',
  target: "es5"
});

const dtsBundleCommand = spawn('npx dts-bundle-generator --project tsconfig.json -o build/lib/index.d.ts src/index.ts', {
  shell: true
});

dtsBundleCommand.stdout.on('data', data =>   console.log(data.toString()));
dtsBundleCommand.stderr.on('data', data => console.error(data.toString()));

// Forces synchronicity; done mostly so that the logs don't get jumbled up.
dtsBundleCommand.on('exit', () => {
  if(dtsBundleCommand.exitCode != 0) {
    process.exit(dtsBundleCommand.exitCode);
  }

  const namespacedDtsBundleCmd = spawn('npx dts-bundle-generator --project tsconfig.json -o build/lib/index.namespaced.d.ts src/index-namespaced.ts', {
    shell: true
  });

  namespacedDtsBundleCmd.stdout.on('data', data =>   console.log(data.toString()));
  namespacedDtsBundleCmd.stderr.on('data', data => console.error(data.toString()));

  namespacedDtsBundleCmd.on('exit', () => {
    if(namespacedDtsBundleCmd.exitCode != 0) {
      process.exit(namespacedDtsBundleCmd.exitCode);
    }
  })
});