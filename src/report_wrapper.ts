/*
I wanted to build the .d.ts by next statement, but got an error.
start "" tsc --declaration -t es2015 --emitDeclarationOnly --outDir types src\report_wrapper.ts
src/report_wrapper.ts:22:8 - error TS2846: A declaration file cannot be imported without 'import type'. Did you mean to import an implementation file '../types/h5_base.js' instead?

22 } from '../types/h5_base.d.ts';

Found 1 error in src/report_wrapper.ts:22

Solution:
Use "} from './h5_base';" for "start "" tsc --declaration -t es2015 --emitDeclarationOnly --outDir types src\report_wrapper.ts",
and use "} from '../types/h5_base.d.ts';" for deno.
*/
import {
	type AnQiH5PageData,
	CHANGE_LANG_BUTTON_TEXT_MAP,
	convertDateToYYYYMMDD_hhmmss,
	createElement,
	createPageElement,
	getChangeLangNotifyArrayOfCurrentPage,
	getCurrentLang,
	getCurrentPageLocalStorage,
	getHtmlElement,
	getHtmlFromI18nable,
	getPageCss,
	getPageParameterByName,
	type I18nable,
	LANG_ARRAY,
	LANG_PROPERTY,
	Language,
	parsePageParamsFromUrl,
	setCurrentLang,
	setF1Content,
	updateUIByCurrentLang,
// For deno
} from '../types/h5_base.d.ts';
// For the statement: start "" tsc --declaration -t es2015 --emitDeclarationOnly --outDir types src\report_wrapper.ts
// } from './h5_base';

export type AnQiReportWrapperInited = {
	report_wrapper_inited: boolean;
};

/**  */
export type AnQiReportWrapperInitParam = {
	pageSubject: I18nable;
	pageSummary: I18nable;
	reportNameI18n: I18nable;
	defaultConfigJson: string;
	/**
	 * <thead style="display: table-header-group;"><tr id="brickPageItemTableHeadTr"><td><en>Operations</en><zh_cn>操作</zh_cn><zh_tw>操作</zh_tw></td></tr></thead>
	 * <td><en>Faces</en><zh_cn>面</zh_cn><zh_tw>面</zh_tw></td><td><en>Side</en><zh_cn>边</zh_cn><zh_tw>邊</zh_tw></td><td><en>Contents of all sides</en><zh_cn>各面内容</zh_cn><zh_tw>各面內容</zh_tw></td><td><en>Outside Boundary Line Style</en><zh_cn>外边界线样式</zh_cn><zh_tw>外邊界線樣式</zh_tw></td><td><en>Interior Line Style</en><zh_cn>内部线样式</zh_cn><zh_tw>內部線樣式</zh_tw></td><td><en>Text Style</en><zh_cn>文本样式</zh_cn><zh_tw>文字樣式</zh_tw></td>
	 */
	itemTableHeadTrColumnsInfo: I18nable[];
	initItemUsableButtonsWrap: (parentElement: HTMLDivElement) => void;
	// initItemUsableButtonsWrap: (parentElement: HTMLDivElement) => void,
	// configChangedEvent: () => void,
};

export type AnQiReportData = {
	reportNameI18n: I18nable;
	configData: AnQiReportConfigData;
	configJson: string;
	defaultConfigJson: string;
};

export type AnQiReportConfigData = {
	// isA3: boolean;
	// isLandscape: boolean;
	paperWidth: number;
	paperHeight: number;

	marginTop: number;
	marginLeft: number;
	marginRight: number;
	marginBottom: number;

	otherData: object;
	itemArray: object[];
};

/**
 * <en></en>
 * <zh_cn></zh_cn>
 * <zh_tw></zh_tw>
 */

/**
 * <en>Parse the parameters in the url and set the data-lang attribute to automatically update the html when changing the language.</en>
 * <zh_cn>解析url中的参数，并设定更改语言时自动更新html的data-lang属性。</zh_cn>
 * <zh_tw>解析url中的參數，並設定更改語言時自動更新html的data-lang内容。</zh_tw>
 */
{
	parsePageParamsFromUrl(window.location.href);

	const CHANGE_LANG_NOTIFY_ARRAY = getChangeLangNotifyArrayOfCurrentPage();
	const htmlElement = getHtmlElement();
	CHANGE_LANG_NOTIFY_ARRAY.push((lang: Language) => {
		htmlElement.setAttribute(LANG_PROPERTY, lang);
	});
}
// Note: I don't know why CHANGE_LANG_NOTIFY_ARRAY is still alive.

export type AnQiReportObjectAndEvent = {
	reportWindow: Window;
	reportWindowLoaded: () => void;
	build: () => void;
	updateConfig: (newData: AnQiReportConfigData) => void;

	paperConfigChanged: () => void;
	itemDataChanged: () => void;

	postBuild: () => void;
	postChangeCss: () => void;
	postChangeLang: () => void;
	postPrint: () => void;
};

export type AnQiReportMessageCoreData = {
	title: I18nable;
	css: string;
	html: string;
	lang: Language;
};

// anqiReportMessageCoreData

/**
 * <en></en>
 * <zh_cn></zh_cn>
 * <zh_tw></zh_tw>
 */
{
	// Window: message event. https://developer.mozilla.org/en-US/docs/Web/API/Window/message_event

	const previewIframe = document.getElementById('brickPageIframe') as unknown as {
		onload: () => void;
		onreadystatechange: () => void;
	};
	const reportWindow = (previewIframe as unknown as { contentWindow: Window })
		.contentWindow as Window;

	const anqiReportObjectAndEvent = window as unknown as AnQiReportObjectAndEvent;
	anqiReportObjectAndEvent.reportWindow = reportWindow;

	anqiReportObjectAndEvent.postBuild = () => {
		const { anqiReportMessageCoreData: { title, css, html, lang } } = window as unknown as {
			anqiReportMessageCoreData: AnQiReportMessageCoreData;
		};
		reportWindow.postMessage({
			command: 'build',
			data: { title, css, html, lang },
		}, '*');
	};

	anqiReportObjectAndEvent.postChangeCss = () => {
		const { anqiReportMessageCoreData: { css } } = window as unknown as {
			anqiReportMessageCoreData: AnQiReportMessageCoreData;
		};
		reportWindow.postMessage({
			command: 'changeCss',
			data: { css },
		}, '*');
	};

	anqiReportObjectAndEvent.postChangeLang = () => {
		const { anqiReportMessageCoreData: { lang } } = window as unknown as {
			anqiReportMessageCoreData: AnQiReportMessageCoreData;
		};
		reportWindow.postMessage({
			command: 'changeLang',
			data: { lang },
		}, '*');
	};

	anqiReportObjectAndEvent.postPrint = () => {
		reportWindow.postMessage({
			command: 'print',
			data: {},
		}, '*');
	};
}
// Destoried:
// console.log(previewIframe);
// console.log(execReportWindowLoaded);

// brickPageToolbar
{
	const brickPageSponsorImage = document.getElementById(
		'brickPageSponsorImage',
	) as HTMLImageElement;
	brickPageSponsorImage.onclick = (event: Event) => {
		brickPageSponsorImage.style.display = 'none';
		event.preventDefault();
		// event.cancelBubble = true;
		event.stopPropagation();
		return false;
	};

	const previewButtonElements =
		(document.getElementById('brickPageToolbar') as HTMLDivElement).children;
	const previewButtonElementsCount = previewButtonElements.length;
	for (let i = 0; i < previewButtonElementsCount; ++i) {
		const span = previewButtonElements.item(i) as HTMLSpanElement;
		span.onclick = () => {
			switch (i) {
				case 0:
					// download
					// TODO(@anqisoft)
					break;
				case 1:
					// print
					(window as unknown as AnQiReportObjectAndEvent).postPrint();
					break;
				case 2:
					// share
					// TODO(@anqisoft): Show QrCode image by script.
					break;
				case 3:
					// sponsor
					brickPageSponsorImage.style.display = 'block';
					break;
				default:
					break;
			}
		};
	}
}

(() => {
	function build() {
		const buildEvent =
			(window as unknown as { buildEvent?: () => { title: string; css: string; html: string } })
				.buildEvent;
		if (buildEvent) {
			const { title, css, html } = buildEvent();
			(window as unknown as AnQiReportObjectAndEvent).postBuild();
		}
	}

	function saveConfig(newData: object) {
		// TODO(@anqisoft)
	}

	function updateConfig(newData: AnQiReportConfigData) {
		// TODO(@anqisoft)
		const { anqiReportData } = window as unknown as { anqiReportData: AnQiReportData };
		const { configData } = anqiReportData;

		for (const p in newData) {
			switch (p) {
				// case 'isA3':
				// 	configData.isA3 = newData.isA3;
				// 	break;
				// case 'isLandscape':
				// 	configData.isLandscape = newData.isLandscape;
				// 	break;
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

		// TODO(@anqisoft) change the values, table, and rebuild the report.
	}

	const loadConfigFromLocalCallback = (newData: AnQiReportConfigData) => {
		updateConfig(newData);
	};

	// https://www.cnblogs.com/gamedaybyday/p/9906542.html
	// const { fileReaderElement } = this;
	const fileReaderElement = createElement('input') as HTMLInputElement;
	fileReaderElement.type = 'file';
	fileReaderElement.onchange = () => {
		if (!fileReaderElement.files) return;

		const selectedFile = fileReaderElement.files[0];
		const { name, size } = selectedFile;
		console.log('read file:', name, size);

		const reader = new FileReader();
		reader.readAsText(selectedFile);

		reader.onload = function () {
			const result = this.result as string;
			const object = JSON.parse(result);
			console.log(result, object);
			loadConfigFromLocalCallback(object);
		};
	};

	function loadDefaultConfig() {
		const { anqiReportData } = window as unknown as { anqiReportData: AnQiReportData };
		updateConfig(JSON.parse(anqiReportData.defaultConfigJson));
	}

	function loadConfigFromLocal() {
		fileReaderElement.click();
	}

	function saveConfigToLocal() {
		const { anqiReportData } = window as unknown as { anqiReportData: AnQiReportData };
		// https://blog.csdn.net/qq_38431572/article/details/102687955
		const blob = new Blob([anqiReportData.configJson], {
			type: 'application/json',
		});
		const configFilename = `anqisoft_${anqiReportData.reportNameI18n[getCurrentLang()]}_${
			convertDateToYYYYMMDD_hhmmss(new Date())
		}.config`;

		if ('msSaveOrOpenBlob' in navigator) {
			((window as unknown as { navigator: object }).navigator as unknown as {
				msSaveOrOpenBlob: (blob: Blob, configName: string) => void;
			}).msSaveOrOpenBlob(blob, configFilename);
		} else {
			const url = window.URL.createObjectURL(blob);
			const link = createElement('a') as HTMLAnchorElement;
			link.href = url;
			link.setAttribute('download', configFilename);
			link.click();
		}
	}

	const configButtonElements =
		(document.getElementById('brickPageConfigCoreToolbar') as HTMLDivElement).children;
	const configButtonElementsCount = configButtonElements.length;
	for (let i = 0; i < configButtonElementsCount; ++i) {
		const span = configButtonElements.item(i) as HTMLSpanElement;
		span.onclick = () => {
			switch (i) {
				case 0:
					// build
					build();
					break;
				case 1:
					// useDefaultConfig, loadDefaultConfig
					loadDefaultConfig();
					break;
				case 2:
					// load, loadConfigFromLocal
					loadConfigFromLocal();
					break;
				case 3:
					// save, saveConfigToLocal
					saveConfigToLocal();
					break;
				default:
					break;
			}
		};
	}

	updateUIByCurrentLang();
})();

// Test only
{
	init({
		pageSubject: {
			en: 'Page Title',
			zh_cn: '页面标题',
			zh_tw: '頁面標題',
		},
		pageSummary: {
			en: 'Page Summary',
			zh_cn: '页面描述',
			zh_tw: '頁面描述',
		},
		reportNameI18n: {
			en: 'Report',
			zh_cn: '报表',
			zh_tw: '報表',
		},
		defaultConfigJson: '{}',
		// <td><en>Faces</en><zh_cn>面</zh_cn><zh_tw>面</zh_tw></td><td><en>Side</en><zh_cn>边</zh_cn><zh_tw>邊</zh_tw></td><td><en>Contents of all sides</en><zh_cn>各面内容</zh_cn><zh_tw>各面內容</zh_tw></td><td><en>Outside Boundary Line Style</en><zh_cn>外边界线样式</zh_cn><zh_tw>外邊界線樣式</zh_tw></td><td><en>Interior Line Style</en><zh_cn>内部线样式</zh_cn><zh_tw>內部線樣式</zh_tw></td><td><en>Text Style</en><zh_cn>文本样式</zh_cn><zh_tw>文字樣式</zh_tw></td>
		itemTableHeadTrColumnsInfo: [
			{ en: 'Faces', zh_cn: '面', zh_tw: '面' },
			{ en: 'Side', zh_cn: '边', zh_tw: '邊' },
			{ en: 'Contents of all sides', zh_cn: '各面内容', zh_tw: '各面內容' },
			{ en: 'Outside Boundary Line Style', zh_cn: '外边界线样式', zh_tw: '外邊界線樣式' },
			{ en: 'Interior Line Style', zh_cn: '内部线样式', zh_tw: '內部線樣式' },
			{ en: 'Text Style', zh_cn: '文本样式', zh_tw: '文字樣式' },
		],
		initItemUsableButtonsWrap: (parentElement: HTMLDivElement) => {
		},
	});
}

{
	const brickPageMainContentSubject = document.getElementById('brickPageMainContentSubject');
	LANG_ARRAY.forEach((langOuter: Language) => {
		const wrapper = document.createElement(langOuter);
		brickPageMainContentSubject?.appendChild(wrapper);

		LANG_ARRAY.filter((lang: Language) => lang !== langOuter).forEach((lang: Language) => {
			const button = document.createElement('button');
			wrapper.appendChild(button);

			button.type = 'button';
			// deno-lint-ignore no-explicit-any
			button.textContent = (CHANGE_LANG_BUTTON_TEXT_MAP as any)[lang];

			button.style.position = 'relative';
			button.style.marginLeft = '2em';
			button.style.top = '0.5em';

			button.onclick = () => {
				setCurrentLang(lang);
			};
		});
	});

	const brickPageMainPreviewSubject = document.getElementById(
		'brickPageMainPreviewSubject',
	) as HTMLDivElement;
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
}

function init(data: AnQiReportWrapperInitParam) {
	if ((window as unknown as AnQiReportWrapperInited).report_wrapper_inited) return;
	(window as unknown as AnQiReportWrapperInited).report_wrapper_inited = true;

	const { pageSubject, pageSummary, reportNameI18n, defaultConfigJson } = data;
	(document.getElementById('brickPageSubjectText') as HTMLDivElement).innerHTML =
		getHtmlFromI18nable(pageSubject);
	(document.getElementById('brickPageSummary') as HTMLDivElement).innerHTML = getHtmlFromI18nable(
		pageSummary,
	);

	const defaultConfigData = Object.assign({
		// isA3: false,
		// isLandscape: false,

		// A4 portrait
		paperWidth: 210,
		paperHeight: 297,

		marginTop: 15,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 25,

		otherData: {},
		itemArray: [],
	}, defaultConfigJson.length > 2 ? JSON.parse(defaultConfigJson) : {});

	const configJson = JSON.stringify(defaultConfigData);
	const configData = JSON.parse(configJson);

	(window as unknown as { anqiReportData: AnQiReportData }).anqiReportData = {
		reportNameI18n,
		configData,
		configJson,
		defaultConfigJson: configJson,
	};

	const localStorageInfo = getCurrentPageLocalStorage();
	if (localStorageInfo.length > 0) {
		(window as unknown as AnQiReportObjectAndEvent).updateConfig(JSON.parse(localStorageInfo));
	}
}
