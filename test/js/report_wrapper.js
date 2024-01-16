// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

{
    parsePageParamsFromUrl(window.location.href);
    const CHANGE_LANG_NOTIFY_ARRAY = getChangeLangNotifyArrayOfCurrentPage();
    const htmlElement = getHtmlElement();
    CHANGE_LANG_NOTIFY_ARRAY.push((lang)=>{
        htmlElement.setAttribute(LANG_PROPERTY, lang);
    });
}{
    const previewIframe = document.getElementById('brickPageIframe');
    const reportWindow = previewIframe.contentWindow;
    const anqiReportObjectAndEvent = window;
    anqiReportObjectAndEvent.reportWindow = reportWindow;
    anqiReportObjectAndEvent.postBuild = ()=>{
        const { anqiReportMessageCoreData: { title, css, html, lang } } = window;
        reportWindow.postMessage({
            command: 'build',
            data: {
                title,
                css,
                html,
                lang
            }
        }, '*');
    };
    anqiReportObjectAndEvent.postChangeCss = ()=>{
        const { anqiReportMessageCoreData: { css } } = window;
        reportWindow.postMessage({
            command: 'changeCss',
            data: {
                css
            }
        }, '*');
    };
    anqiReportObjectAndEvent.postChangeLang = ()=>{
        const { anqiReportMessageCoreData: { lang } } = window;
        reportWindow.postMessage({
            command: 'changeLang',
            data: {
                lang
            }
        }, '*');
    };
    anqiReportObjectAndEvent.postPrint = ()=>{
        reportWindow.postMessage({
            command: 'print',
            data: {}
        }, '*');
    };
}{
    const brickPageSponsorImage = document.getElementById('brickPageSponsorImage');
    brickPageSponsorImage.onclick = (event)=>{
        brickPageSponsorImage.style.display = 'none';
        event.preventDefault();
        event.stopPropagation();
        return false;
    };
    const previewButtonElements = document.getElementById('brickPageToolbar').children;
    const previewButtonElementsCount = previewButtonElements.length;
    for(let i = 0; i < previewButtonElementsCount; ++i){
        const span = previewButtonElements.item(i);
        span.onclick = ()=>{
            switch(i){
                case 0:
                    break;
                case 1:
                    window.postPrint();
                    break;
                case 2:
                    break;
                case 3:
                    brickPageSponsorImage.style.display = 'block';
                    break;
                default:
                    break;
            }
        };
    }
}(()=>{
    function build() {
        const buildEvent = window.buildEvent;
        if (buildEvent) {
            const { title, css, html } = buildEvent();
            window.postBuild();
        }
    }
    function updateConfig(newData) {
        const { anqiReportData } = window;
        const { configData } = anqiReportData;
        for(const p in newData){
            switch(p){
                case 'paperWidth':
                    configData.paperWidth = newData.paperWidth;
                    break;
                case 'paperHeight':
                    configData.paperHeight = newData.paperHeight;
                    break;
                case 'marginTop':
                    configData.marginTop = newData.marginTop;
                    break;
                case 'marginLeft':
                    configData.marginLeft = newData.marginLeft;
                    break;
                case 'marginRight':
                    configData.marginRight = newData.marginRight;
                    break;
                case 'marginBottom':
                    configData.marginBottom = newData.marginBottom;
                    break;
                case 'otherData':
                    configData.otherData = newData.otherData;
                    break;
                default:
                    break;
            }
        }
        anqiReportData.configJson = JSON.stringify(configData);
    }
    const loadConfigFromLocalCallback = (newData)=>{
        updateConfig(newData);
    };
    const fileReaderElement = createElement('input');
    fileReaderElement.type = 'file';
    fileReaderElement.onchange = ()=>{
        if (!fileReaderElement.files) return;
        const selectedFile = fileReaderElement.files[0];
        const { name, size } = selectedFile;
        console.log('read file:', name, size);
        const reader = new FileReader();
        reader.readAsText(selectedFile);
        reader.onload = function() {
            const result = this.result;
            const object = JSON.parse(result);
            console.log(result, object);
            loadConfigFromLocalCallback(object);
        };
    };
    function loadDefaultConfig() {
        const { anqiReportData } = window;
        updateConfig(JSON.parse(anqiReportData.defaultConfigJson));
    }
    function loadConfigFromLocal() {
        fileReaderElement.click();
    }
    function saveConfigToLocal() {
        const { anqiReportData } = window;
        const blob = new Blob([
            anqiReportData.configJson
        ], {
            type: 'application/json'
        });
        const configFilename = `anqisoft_${anqiReportData.reportNameI18n[getCurrentLang()]}_${convertDateToYYYYMMDD_hhmmss(new Date())}.config`;
        if ('msSaveOrOpenBlob' in navigator) {
            window.navigator.msSaveOrOpenBlob(blob, configFilename);
        } else {
            const url = window.URL.createObjectURL(blob);
            const link = createElement('a');
            link.href = url;
            link.setAttribute('download', configFilename);
            link.click();
        }
    }
    const configButtonElements = document.getElementById('brickPageConfigCoreToolbar').children;
    const configButtonElementsCount = configButtonElements.length;
    for(let i = 0; i < configButtonElementsCount; ++i){
        const span = configButtonElements.item(i);
        span.onclick = ()=>{
            switch(i){
                case 0:
                    build();
                    break;
                case 1:
                    loadDefaultConfig();
                    break;
                case 2:
                    loadConfigFromLocal();
                    break;
                case 3:
                    saveConfigToLocal();
                    break;
                default:
                    break;
            }
        };
    }
    updateUIByCurrentLang();
})();
{
    init({
        pageSubject: {
            en: 'Page Title',
            zh_cn: '页面标题',
            zh_tw: '頁面標題'
        },
        pageSummary: {
            en: 'Page Summary',
            zh_cn: '页面描述',
            zh_tw: '頁面描述'
        },
        reportNameI18n: {
            en: 'Report',
            zh_cn: '报表',
            zh_tw: '報表'
        },
        defaultConfigJson: '{}',
        itemTableHeadTrColumnsInfo: [
            {
                en: 'Faces',
                zh_cn: '面',
                zh_tw: '面'
            },
            {
                en: 'Side',
                zh_cn: '边',
                zh_tw: '邊'
            },
            {
                en: 'Contents of all sides',
                zh_cn: '各面内容',
                zh_tw: '各面內容'
            },
            {
                en: 'Outside Boundary Line Style',
                zh_cn: '外边界线样式',
                zh_tw: '外邊界線樣式'
            },
            {
                en: 'Interior Line Style',
                zh_cn: '内部线样式',
                zh_tw: '內部線樣式'
            },
            {
                en: 'Text Style',
                zh_cn: '文本样式',
                zh_tw: '文字樣式'
            }
        ],
        initItemUsableButtonsWrap: (parentElement)=>{}
    });
}{
    const brickPageMainContentSubject = document.getElementById('brickPageMainContentSubject');
    LANG_ARRAY.forEach((langOuter)=>{
        const wrapper = document.createElement(langOuter);
        brickPageMainContentSubject?.appendChild(wrapper);
        LANG_ARRAY.filter((lang)=>lang !== langOuter).forEach((lang)=>{
            const button = document.createElement('button');
            wrapper.appendChild(button);
            button.type = 'button';
            button.textContent = CHANGE_LANG_BUTTON_TEXT_MAP[lang];
            button.style.position = 'relative';
            button.style.marginLeft = '2em';
            button.style.top = '0.5em';
            button.onclick = ()=>{
                setCurrentLang(lang);
            };
        });
    });
    const brickPageMainPreviewSubject = document.getElementById('brickPageMainPreviewSubject');
    brickPageMainPreviewSubject.style.position = 'relative';
    const image = document.createElement('img');
    brickPageMainPreviewSubject.appendChild(image);
    image.setAttribute('src', './images/sponsor.jpg');
    image.setAttribute('alt', './images/sponsor.jpg');
    const { style } = image;
    style.width = '8vw';
    style.height = '8vw';
    style.position = 'absolute';
    style.top = '0.5vw';
    style.right = '2vw';
}function init(data) {
    if (window.report_wrapper_inited) return;
    window.report_wrapper_inited = true;
    const { pageSubject, pageSummary, reportNameI18n, defaultConfigJson } = data;
    document.getElementById('brickPageSubjectText').innerHTML = getHtmlFromI18nable(pageSubject);
    document.getElementById('brickPageSummary').innerHTML = getHtmlFromI18nable(pageSummary);
    const defaultConfigData = Object.assign({
        paperWidth: 210,
        paperHeight: 297,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 25,
        otherData: {},
        itemArray: []
    }, defaultConfigJson.length > 2 ? JSON.parse(defaultConfigJson) : {});
    const configJson = JSON.stringify(defaultConfigData);
    const configData = JSON.parse(configJson);
    window.anqiReportData = {
        reportNameI18n,
        configData,
        configJson,
        defaultConfigJson: configJson
    };
    const localStorageInfo = getCurrentPageLocalStorage();
    if (localStorageInfo.length > 0) {
        window.updateConfig(JSON.parse(localStorageInfo));
    }
}
