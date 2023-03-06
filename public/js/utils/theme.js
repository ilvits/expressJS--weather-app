const language = localStorage.s_lang === 'true' ? 'en' : 'ru'

function paginationState() { if (splide.length) return true }

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (localStorage.theme == 2) {
        if (e.matches) {
            document.documentElement.classList.add('dark')
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#131E32');
        } else {
            document.documentElement.classList.remove('dark')
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#F3F4F7');
        }
    }
});

if (localStorage.theme == 1) {
    activateTheme(1)
} else if (localStorage.theme == 2 || !('theme' in localStorage)) {
    activateTheme(2)
} else {
    activateTheme(0)
}

function activateTheme(mode) {
    if (mode == 1) {
        document.documentElement.classList.add('dark')
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#131E32');
    } else if (mode == 0) {
        document.documentElement.classList.remove('dark')
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#F3F4F7');
    } else if (mode == 2) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#131E32');
        } else {
            document.documentElement.classList.remove('dark')
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#F3F4F7');
        }
    }
    localStorage.theme = mode
}