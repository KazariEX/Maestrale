export default defineNuxtConfig({
    css: [
        "~/assets/scss/index.scss"
    ],
    ssr: false,
    devServer: {
        port: 615
    },
    devtools: {
        enabled: true
    },
    modules: [
        "@element-plus/nuxt",
        "@nuxt/image",
        "@pinia/nuxt"
    ]
});