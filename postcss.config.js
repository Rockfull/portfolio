export default {
    plugins: {
        '@csstools/postcss-global-data': {
            // CAMBIO: De global.module.css a global.css
            files: ['app/global.css'],
        },
        'postcss-custom-media': {},
    },
};