module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
        [
            '@tamagui/babel-plugin',
            {
                components: ['tamagui'],
                config: './tamagui.config.ts',
                logTimings: true,
            },
        ],
        [
            'module:react-native-dotenv',
            {
                moduleName: '@env',
                path: '.env.local',
                allowUndefined: false,
            },
        ],
        'react-native-reanimated/plugin', // always last
    ],
}
