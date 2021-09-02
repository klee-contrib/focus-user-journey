// @ts-check

import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy-glob";
import postcss from "rollup-plugin-postcss";

export default (() => {
    /** @type {import("rollup").RollupOptions} */
    const config = {
        input: "src/index.ts",
        plugins: [
            // @ts-ignore
            postcss({extract: true, modules: true}),
            typescript(),
            copy([
                {files: "src/**/*.css.d.ts", dest: "lib"},
                {files: "src/**/*.css.d.ts", dest: "lib"}
            ])
        ],
        treeshake: {
            moduleSideEffects: false
        },
        output: {
            format: "esm",
            dir: "lib"
        },
        external: ["react/jsx-runtime", "i18next", "mobx-react", "@focus4/styling", "@focus4/toolbox", "mobx"]
    };

    return config;
})();
