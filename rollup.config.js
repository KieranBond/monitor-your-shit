import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

const globals = {
    ...packageJson.devDependencies,
};

export default {
    input: 'src/index.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs', // commonJS
            sourcemap: false,
        },
        // {
        //     file: packageJson.module,
        //     format: 'esm', // ES Modules
        //     sourcemap: false,
        // },
    ],
    plugins: [
        nodeResolve({ browser:true, preferBuiltins: true })
        , commonjs({ namedExports: {axios: ['get']} })
        // , globals()
        // , builtins()
        , json()
        , babel
        ({ exclude: 'node_modules/**'
            , presets: [['@babel/preset-env', {useBuiltIns: 'entry', corejs: 3}]]
        }),
        typescript({
            useTsconfigDeclarationDir: true,
            tsconfigOverride: {},
        }),

        // babel(),
        // json(),
        // peerDepsExternal(),
        // resolve(),
        // commonjs(),
        // I have no idea what is happening
        // commonjs({
        //     exclude: 'node_modules',
        //     ignoreGlobal: true,
        // }),
        // nodeResolve({
        //     // use "jsnext:main" if possible
        //     // see https://github.com/rollup/rollup/wiki/jsnext:main
        //     jsnext: true
        // }),
    ],
    external: Object.keys(globals),
};

// Other useful plugins you might want to add are:
// @rollup/plugin-images - import image files into your components
// @rollup/plugin-json - import JSON files into your co
