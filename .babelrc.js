{
    "presets": [
        ["es2015", { "module": false }],
        "react",
        "stage-0",
        "next/babel"
    ],
    "plugins": [
        [
            "transform-runtime", {
                "helpers": false,
                "polyfill": false,
                "regenerator": true,
                "moduleName": "babel-runtime"
            }
        ],
        ["transform-define", "./env-config.js"]
    ]
}
