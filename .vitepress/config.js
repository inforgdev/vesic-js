export default {
    title: 'VesicJS',
    description: 'VesicJS Website',
    base: '/vesic-js/',
    srcDir: './src/docs',
    outDir: './dist/docs',
    themeConfig: themeConfig(),
};

function themeConfig() {
    return {
        siteTitle: 'VesicJS',
        socialLinks: [
            { icon: 'github', link: 'https://github.com/inforgdev/vesic-js' },
        ],
        footer: {
            copyright: "By Inforg",
        },
    };
}