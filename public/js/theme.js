const themeInit = () => {
    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => {
            if (settings.theme === 2) {
                activateTheme(2);
            } else if (e.matches) {
                activateTheme(1);
            } else {
                activateTheme(0);
            }
        });

    if (settings.theme === 1) {
        activateTheme(1);
    } else if (settings.theme === 2) {
        activateTheme(2);
    } else {
        activateTheme(0);
    }
};
function activateTheme(mode) {
    let theme;
    if (mode === 1) {
        document.documentElement.classList.add('dark');
        document
            .querySelector('meta[name="theme-color"]')
            .setAttribute('content', '#131E32');
        theme = 'dark';
    } else if (mode === 0) {
        document.documentElement.classList.remove('dark');
        document
            .querySelector('meta[name="theme-color"]')
            .setAttribute('content', '#F3F4F7');
        theme = 'light';
    } else if (mode === 2) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute('content', '#131E32');
            theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute('content', '#F3F4F7');
            theme = 'light';
        }
    }
    window.dispatchEvent(
        new CustomEvent('changetheme', {
            detail: {
                theme,
            },
        })
    );
    updateSettings('theme', mode);
}
