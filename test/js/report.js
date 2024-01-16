// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

{
    if (window === window.top) {
        window.location.href = 'index.htm';
    }
    window.addEventListener('message', function(event) {
        const { data: { command, data: { lang, title, css, html } } } = event;
        switch(command){
            case 'build':
                updateReport(lang, title, css, html);
                break;
            case 'changeCss':
                styleElement.innerHTML = css;
                break;
            case 'changeLang':
                changeLang(lang);
                break;
            case 'print':
                window.print();
                break;
            default:
                break;
        }
    });
    const styleElement = document.getElementById('style');
    const reportElement = document.getElementById('report_wrapper');
    const titleElement = document.getElementsByTagName('title')[0];
    const htmlElement = document.getElementsByTagName('html')[0];
    const updateReport = (lang, title, css, html)=>{
        htmlElement.setAttribute('data-lang', lang);
        titleElement.i18n = title;
        titleElement.innerHTML = title[lang];
        styleElement.innerHTML = css;
        reportElement.innerHTML = html;
    };
    const changeLang = (lang)=>{
        htmlElement.setAttribute('data-lang', lang);
        const i18n = titleElement.i18n;
        if (typeof i18n !== 'undefined') {
            titleElement.innerHTML = i18n[lang];
        }
    };
}