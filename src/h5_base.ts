/*
 * Copyright (c) 2023 anqisoft@gmail.com
 * h5_base.ts
 *
 * <en>
 * Created on Sun Nov 05 2023 14:49:56
 * Feature: Provides basic types, basic constants and basic functions of H5 pages.
 * </en>
 *
 * <zh_cn>
 * 创建：2023年11月5日 14:49:56
 * 功能：提供H5页面基本类型、基础常量与基础函数。
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2023年11月5日 14:49:56
 * 功能：提供H5頁面基本型別、基礎常數與基礎函數。
 * </zh_tw>
 */


/**
 * <en>language</en>
 * <zh_cn>语言</zh_cn>
 * <zh_tw>語言</zh_tw>
 */
export type Language = 'en' | 'zh_cn' | 'zh_tw';

/**
 * <en>array: language</en>
 * <zh_cn>语言数组</zh_cn>
 * <zh_tw>語言數組</zh_tw>
 */
export const LANG_ARRAY: Language[] = ['en', 'zh_cn', 'zh_tw'];

/**
 * <en>Internationalizable</en>
 * <zh_cn>可国际化</zh_cn>
 * <zh_tw>可國際化</zh_tw>
 */
export type I18nable = {
	en: string;
	zh_cn: string;
	zh_tw: string;
}

/**
 * <en>Dictionary: Change page language button text.</en>
 * <zh_cn>字典：更改页面语言按钮文本。</zh_cn>
 * <zh_tw>字典：更改頁面語言按鈕文字。</zh_tw>
 */
export const CHANGE_LANG_BUTTON_TEXT_MAP: I18nable = {
	'en': 'EN',
	'zh_cn': '简',
	'zh_tw': '繁',
};

/**
 * <en>default language</en>
 * <zh_cn>默认语言</zh_cn>
 * <zh_tw>默認語言</zh_tw>
 */
export const DEFAULT_LANG = 'en';

/**
 * <en>Current URL</en>
 * <zh_cn>当前网址</zh_cn>
 * <zh_tw>當前網址</zh_tw>
 */
export const CURRENT_URL = window.location.href;

/**
 * <en>Home URL</en>
 * <zh_cn>首页网址</zh_cn>
 * <zh_tw>首頁網址</zh_tw>
 */
export const HOME_URL = CURRENT_URL.startsWith('file:///')
	? CURRENT_URL.substring(0, CURRENT_URL.lastIndexOf('/') + 1).concat('index.htm')
	: CURRENT_URL.split('/').splice(0, 3).join('/').concat('/');

/**
 * <en>Site Root</en>
 * <zh_cn>网站根目录</zh_cn>
 * <zh_tw>網站根目錄</zh_tw>
 */
export const SITE_ROOT = HOME_URL.substring(0, HOME_URL.lastIndexOf('/') + 1);

/**
 * <en>Website image directory</en>
 * <zh_cn>网站图片目录</zh_cn>
 * <zh_tw>網站圖片目錄</zh_tw>
 */
export const SITE_IMAGE_PATH = `${SITE_ROOT}images/`;

/**
 * <en>Site Script Directory</en>
 * <zh_cn>网站脚本目录</zh_cn>
 * <zh_tw>網站腳本目錄</zh_tw>
 */
export const SITE_JAVASCRIPT_PATH = `${SITE_ROOT}js/`;

/**
 * <en>Site Style Sheet Directory</en>
 * <zh_cn>网站样式表目录</zh_cn>
 * <zh_tw>網站樣式表目錄</zh_tw>
 */
export const SITE_CSS_PATH = `${SITE_ROOT}css/`;

/**
 * <en>Get the specified parameter value from the URL.</en>
 * <zh_cn>从网址中获取指定参数值</zh_cn>
 * <zh_tw>從網址中獲取指定參數值</zh_tw>
 * @param name
 * <en>Parameter name</en>
 * <zh_cn>参数名</zh_cn>
 * <zh_tw>參數名</zh_tw>
 * @param defaultValue
 * <en>Default value of the parameter</en>
 * <zh_cn>参数默认值</zh_cn>
 * <zh_tw>參數默認值</zh_tw>
 * @returns
 * <en>Parameter value</en>
 * <zh_cn>参数值</zh_cn>
 * <zh_tw>參數值</zh_tw>
 */
export const getPageParameterByName = (
	name: string,
	defaultValue: string | null,
) => {
	const REPLACED_CURRENT_URL = CURRENT_URL.replace('?', '&');
	return REPLACED_CURRENT_URL.indexOf(`&${name}=`) === -1
		? defaultValue || ''
		: decodeURIComponent(
			REPLACED_CURRENT_URL.split('&').slice(1).filter((keyValue: string) =>
				keyValue.startsWith(${name}=)
			)[0].split('=')[1],
		);
};

/**
 * <en>Html attributes: language</en>
 * <zh_cn>html属性：语言</zh_cn>
 * <zh_tw>html内容：語言</zh_tw>
 */
export const LANG_PROPERTY = 'data-lang';

/**
 * <en>Array: The full English name of the month.</en>
 * <zh_cn>数组：英文月份完整名。</zh_cn>
 * <zh_tw>陣列：英文月份完整名。</zh_tw>
 */
export const MONTH_FULL_NAME_ARRAY = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

/**
 * <en>Array: English month abbreviation.</en>
 * <zh_cn>数组：英文月份简写。</zh_cn>
 * <zh_tw>陣列：英文月份簡寫。</zh_tw>
 */
export const MONTH_NAME_ARRAY = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sept',
	'Oct',
	'Nov',
	'Dec',
];

/*
 * <en>Type: H5 page data</en>
 * <zh_cn>类型：H5页面数据</zh_cn>
 * <zh_tw>類型：H5頁面數據</zh_tw>
 */
export type AnQiH5PageData = {
	/*
	 * <en>Page language, used to control the content displayed by multi-language items.</en>
	 * <zh_cn>页面语言，用于控制多语言项所显示内容。</zh_cn>
	 * <zh_tw>頁面語言，用於控制多語言項目所顯示內容。</zh_tw>
	 */
	LANG: string;
	/*
	 * <en>The paper is thick, leaving gaps for folding.</en>
	 * <zh_cn>纸厚，为折叠而预留空隙。</zh_cn>
	 * <zh_tw>紙張厚，為折疊而預留空隙。</zh_tw>
	 */
	THICKESS: number;
	/*
	 * <en>Whether it is A3 paper.</en>
	 * <zh_cn>是否A3纸。</zh_cn>
	 * <zh_tw>是否A3紙。</zh_tw>
	 */
	A3: boolean;
	/*
	 * <en>Whether the paper is landscape orientation.</en>
	 * <zh_cn>是否横向纸张。</zh_cn>
	 * <zh_tw>是否橫向紙張。</zh_tw>
	 */
	LANDSCAPE: boolean;
	/*
	 * <en>The top margin of the page.</en>
	 * <zh_cn>页面上边距。</zh_cn>
	 * <zh_tw>頁面上邊距。</zh_tw>
	 */
	PAGE_PADDING_TOP: number;
	/*
	 * <en>Page bottom margin.</en>
	 * <zh_cn>页面下边距。</zh_cn>
	 * <zh_tw>頁面下邊距。</zh_tw>
	 */
	PAGE_PADDING_BOTTOM: number;
	/*
	 * <en>Page left margin.</en>
	 * <zh_cn>页面左边距。</zh_cn>
	 * <zh_tw>頁面左邊距。</zh_tw>
	 */
	PAGE_PADDING_LEFT: number;
	/*
	 * <en>Right margin of page.</en>
	 * <zh_cn>页面右边距。</zh_cn>
	 * <zh_tw>頁面右邊距。</zh_tw>
	 */
	PAGE_PADDING_RIGHT: number;
	/*
	 * <en>Paper width.</en>
	 * <zh_cn>纸张宽度。</zh_cn>
	 * <zh_tw>紙張寬度。</zh_tw>
	 */
	PAPER_WIDTH: number;
	/*
	 * <en>Paper height.</en>
	 * <zh_cn>纸张高度。</zh_cn>
	 * <zh_tw>紙張高度。</zh_tw>
	 */
	PAPER_HEIGHT: number;
	/*
	 * <en>Page width.</en>
	 * <zh_cn>页面宽度。</zh_cn>
	 * <zh_tw>頁面寬度。</zh_tw>
	 */
	PAGE_WIDTH: number;
	/*
	 * <en>Page height.</en>
	 * <zh_cn>页面高度。</zh_cn>
	 * <zh_tw>頁面高度。</zh_tw>
	 */
	PAGE_HEIGHT: number;
	/*
	 * <en>serial number.</en>
	 * <zh_cn>序号。</zh_cn>
	 * <zh_tw>序號。</zh_tw>
	 */
	NO: number;
	/*
	 * <en>Scale: millimeters to pixels.</en>
	 * <zh_cn>比例：毫米转像素。</zh_cn>
	 * <zh_tw>比例：毫米轉像素。</zh_tw>
	 */
	MM_TO_PX_SCALE: number;
	/*
	 * <en>Scale: pixels to millimeters.</en>
	 * <zh_cn>比例：像素转毫米。</zh_cn>
	 * <zh_tw>比例：像素轉毫米。</zh_tw>
	 */
	PX_TO_MM_SCALE: number;
};

/**
 * <en>Parse page parameters from URL</en>
 * <zh_cn>从网址解析页面参数</zh_cn>
 * <zh_tw>從網址解析頁面參數</zh_tw>
 * @param url <en>URL</en><zh_cn>网址</zh_cn><zh_tw>網址</zh_tw>
 */
export function parsePageParamsFromUrl(url: string) {
	(window as unknown as { anqiH5PageData: AnQiH5PageData }).anqiH5PageData =
		(window as unknown as { anqiH5PageData: AnQiH5PageData }).anqiH5PageData || {
			LANG: DEFAULT_LANG,
			THICKESS: 0.2,

			A3: false,
			LANDSCAPE: false,

			PAGE_PADDING_TOP: 15,
			PAGE_PADDING_BOTTOM: 15,
			PAGE_PADDING_LEFT: 10,
			PAGE_PADDING_RIGHT: 10,

			PAPER_WIDTH: 0,
			PAPER_HEIGHT: 0,

			PAGE_WIDTH: 0,
			PAGE_HEIGHT: 0,

			NO: 1,

			MM_TO_PX_SCALE: 0,
			PX_TO_MM_SCALE: 0,
		};
	const { anqiH5PageData } = window as unknown as { anqiH5PageData: AnQiH5PageData };

	url = url.replace('?', '&').toLowerCase();
	const keyValueArray = url.split('&').slice(1);
	/**
	 * <en>According to the page parameter name, obtain the corresponding parameter value (if not, return the default value)</en>
	 * <zh_cn>根据页面参数名，获取相应参数值（无则返回默认值）</zh_cn>
	 * <zh_tw>根據頁面參數名，取得對應參數值（無則傳回預設值）</zh_tw>
	 * @param key <en>Page parameter name</en><zh_cn>页面参数名</zh_cn><zh_tw>頁面參數名</zh_tw>
	 * @param defaultValue <en>Default value</en><zh_cn>默认值</zh_cn><zh_tw>預設值</zh_tw>
	 * @returns 
	 * <en>If there is this parameter in the URL, the corresponding value will be returned; otherwise, the default value will be returned.</en>
	 * <zh_cn>如网址中有此参数，则返回相应值；否则返回默认值</zh_cn>
	 * <zh_tw>如網址中有此參數，則傳回對應值；否則傳回預設值</zh_tw>
	 */
	function getValueByUrlParamName(key: string, defaultValue: string): string {
		const SEARCH_STRING = `${key}=`;
		if (url.indexOf(SEARCH_STRING) === -1) { return defaultValue; }

		return keyValueArray.filter((keyValue: string) => keyValue.startsWith(`&${SEARCH_STRING}`))[0]
			.split(
				'=',
			)[1];
	}

	const LANG_IN_URL = getValueByUrlParamName('lang', DEFAULT_LANG);
	const LANG = (LANG_ARRAY as string[]).indexOf(LANG_IN_URL) === -1 ? DEFAULT_LANG : LANG_IN_URL;
	const THICKESS = Math.max(0, parseFloat(getValueByUrlParamName('thickess', '0.2')));

	const A3 = getValueByUrlParamName('a3', 'true') === 'true';
	const LANDSCAPE = getValueByUrlParamName('landscape', 'false') === 'true';

	// 4 => 3.5 => 15
	const PAGE_PADDING_TOP = Math.max(0, parseFloat(getValueByUrlParamName('top', '15')));
	// 3 => 3.5 => 10
	const PAGE_PADDING_LEFT = Math.max(0, parseFloat(getValueByUrlParamName('left', '10')));

	const NO = Math.max(0, parseInt(getValueByUrlParamName('no', '1')));

	// const PAPER_WIDTH = A3 ? (LANDSCAPE ? 420 : 297) : (LANDSCAPE ? 297 : 210);
	// const PAPER_HEIGHT = A3 ? (LANDSCAPE ? 297 : 420) : (LANDSCAPE ? 210 : 297);
	const PAPER_WIDTH = parseFloat(getValueByUrlParamName('width', '0')) ||
		(A3 ? (LANDSCAPE ? 420 : 297) : (LANDSCAPE ? 297 : 210));
	const PAPER_HEIGHT = parseFloat(getValueByUrlParamName('height', '0')) ||
		(A3 ? (LANDSCAPE ? 297 : 420) : (LANDSCAPE ? 210 : 297));

	const PAGE_WIDTH = PAPER_WIDTH - PAGE_PADDING_LEFT * 2;
	const PAGE_HEIGHT = PAPER_HEIGHT - PAGE_PADDING_TOP * 2;

	anqiH5PageData.LANG = LANG;
	anqiH5PageData.THICKESS = THICKESS;

	anqiH5PageData.A3 = A3;
	anqiH5PageData.LANDSCAPE = LANDSCAPE;

	anqiH5PageData.PAGE_PADDING_TOP = PAGE_PADDING_TOP;
	anqiH5PageData.PAGE_PADDING_LEFT = PAGE_PADDING_LEFT;

	anqiH5PageData.PAPER_WIDTH = PAPER_WIDTH;
	anqiH5PageData.PAPER_HEIGHT = PAPER_HEIGHT;

	anqiH5PageData.PAGE_WIDTH = PAGE_WIDTH;
	anqiH5PageData.PAGE_HEIGHT = PAGE_HEIGHT;

	anqiH5PageData.NO = NO;

	const DPI_HELPER = new DPIHelper();
	anqiH5PageData.MM_TO_PX_SCALE = DPI_HELPER.getMmToPxScale();
	anqiH5PageData.PX_TO_MM_SCALE = DPI_HELPER.getPxToMmScale();
}

export function getPageCss() {
	const { A3, LANDSCAPE, PAGE_PADDING_TOP, PAGE_PADDING_LEFT, PAGE_WIDTH, PAGE_HEIGHT } =
		(window as unknown as { anqiH5PageData: AnQiH5PageData }).anqiH5PageData;

	return `\@media print\{\@page\{size:${A3 ? 'A3' : 'A4'} ${
		LANDSCAPE ? 'landscape' : 'portrait'
	};\} \}
*\{margin:0;border:0;padding:0;\}
page:not(:last-of-type)\{page-break-after:always;\}
page\{padding-top:${PAGE_PADDING_TOP}mm;padding-left:${PAGE_PADDING_LEFT}mm;display:block;width:${PAGE_WIDTH}mm;height:${PAGE_HEIGHT}mm;position:relative;overflow:hidden;\}`;
}

export function setF1Content(content: string) {
	// Change the event from 'onkeyup' to 'onkeydown', because the chrome browser doesn't work.
	document.onkeydown = function (e) {
		// 27 ESC
		// alert(e.keyCode);
		// var html = ''; for (var p in e) { html += p.concat('=>', e[p], '<br/>'); } document.getElementsByTagName('body')[0].innerHTML = html;
		switch (e.keyCode) {
			case 112: // F1
				alert(content); // 'box.htm?long=80&width=60&height=50&landscape=false&a3=true&thickess=1&top=3&left=3&extend=5'
				e.preventDefault();
				e.stopPropagation();
				break;
			default:
				break;
		}

		return false;
	};
}

export function getNumbersArray(min: number, max: number): Array<string> {
	const array: Array<string> = [];
	for (let i = min; i <= max; ++i) {
		array.push(i.toString());
	}

	return array;
}

/////////////////////////////////////// Copy from storage.ts
/**
 * <en>Local storage keyword: language, used to record the last selected language</en>
 * <zh_cn>本地存储关键字：语言，用于记录最后一次所选择的语言</zh_cn>
 * <zh_tw>本地存儲關鍵字：語言，用於記錄最後一次所選擇的語言</zh_tw>
 */
export const LOCAL_STORAGE_KEY_OF_LANG = 'lang';

/**
 * <en>Local Storage Keyword: the current page, used to record the configuration selected during the last report generation</en>
 * <zh_cn>本地存储关键字：当前页，用于记录最后一次生成报表时所选择的配置</zh_cn>
 * <zh_tw>本地存儲關鍵字：當前頁，用於記錄最後一次生成報表時所選擇的配寘</zh_tw>
 */
export const LOCAL_STORAGE_KEY_OF_CURRENT_PAGE = CURRENT_URL.includes('?')
	? CURRENT_URL.split('?')[1]
	: CURRENT_URL;

/**
 * <en>Notification: Change Language</en>
 * <zh_cn>通知：更改语言</zh_cn>
 * <zh_tw>通知：更改語言</zh_tw>
 */
const CHANGE_LANG_NOTIFY_ARRAY = [] as Array<(lang: Language) => void>;

/**
 * <en>Get the current language from localStorage</en>
 * <zh_cn>从localStorage获取当前语言</zh_cn>
 * <zh_tw>從localStorage獲取當前語言</zh_tw>
 */
export const getCurrentLang = () =>
	(localStorage.getItem(LOCAL_STORAGE_KEY_OF_LANG) || DEFAULT_LANG) as Language;

/**
 * <en>Set Current Language</en>
 * <zh_cn>设置当前语言</zh_cn>
 * <zh_tw>設定當前語言</zh_tw>
 */
export const setCurrentLang = (lang: Language) => {
	getHtmlElement().setAttribute(LANG_PROPERTY, lang);
	localStorage.setItem(LOCAL_STORAGE_KEY_OF_LANG, lang);
	updateUIByCurrentLang();
};

/**
 * <en>Update the interface according to the current language</en>
 * <zh_cn>根据当前语言更新界面</zh_cn>
 * <zh_tw>根據當前語言更新介面</zh_tw>
 */
export const updateUIByCurrentLang = () => {
	const lang = getCurrentLang();
	// CHANGE_LANG_NOTIFY_ARRAY.forEach((subArray: Array<(lang: Language) => void>) => subArray.forEach((func) => func(lang)));
	CHANGE_LANG_NOTIFY_ARRAY.forEach((func) => func(lang));
};

/**
 * <en>Get the local cache corresponding to the current page.</en>
 * <zh_cn>获取当前页面对应本地缓存</zh_cn>
 * <zh_tw>獲取當前頁面對應本地緩存</zh_tw>
 */
export const getCurrentPageLocalStorage = () =>
	localStorage.getItem(LOCAL_STORAGE_KEY_OF_CURRENT_PAGE) || '';

/**
 * <en>Set the local cache corresponding to the current page.</en>
 * <zh_cn>设置当前页面对应本地缓存</zh_cn>
 * <zh_tw>設定當前頁面對應本地緩存</zh_tw>
 */
export const setCurrentPageLocalStorage = (newValue: string) =>
	localStorage.setItem(LOCAL_STORAGE_KEY_OF_CURRENT_PAGE, newValue);

/**
 * <en>Get the "Change Language" notification array corresponding to the current page.</en>
 * <zh_cn>获取当前页面对应的“更改语言”通知数组</zh_cn>
 * <zh_tw>獲取當前頁面對應的“更改語言”通知數組</zh_tw>
 */
export const getChangeLangNotifyArrayOfCurrentPage = () => CHANGE_LANG_NOTIFY_ARRAY;

/**
 * <en>Clear the "Change Language" notification array corresponding to the current page.</en>
 * <zh_cn>清空当前页面对应的“更改语言”通知数组</zh_cn>
 * <zh_tw>清空當前頁面對應的“更改語言”通知數組</zh_tw>
 */
export const clearChangeLangNotifyArrayOfCurrentPage = () => {
	CHANGE_LANG_NOTIFY_ARRAY.length = 0;
};

/////////////////////////////////////// Copy from DPIHelper.ts

export class DPIHelper {
	private dpiArray: Array<number> = [];
	private dpiX = 0;
	private mmToPxScale = 0;
	private pxToMmScale = 0;
	constructor() {
		// https://blog.csdn.net/baidu_25343343/article/details/84950269
		const screen = window.screen as unknown as {
			deviceXDPI?: number;
			deviceYDPI: number;
		};

		const { dpiArray } = this;
		if (screen.deviceXDPI) {
			dpiArray.push(screen.deviceXDPI);
			dpiArray.push(screen.deviceYDPI);
		} else {
			const div = document.createElement('div');
			div.style.cssText =
				'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
			document.body.appendChild(div);
			dpiArray.push(parseInt(div.offsetWidth.toString()));
			dpiArray.push(parseInt(div.offsetHeight.toString()));
			document.body.removeChild(div);
		}

		const dpiX = dpiArray[0];
		this.dpiX = dpiX;

		this.mmToPxScale = dpiX / 25.4;
		this.pxToMmScale = 25.4 / dpiX;
	}

	public convertPxToMm = (px: number) => px / this.dpiX * 25.4;

	public convertMmToPx = (mm: number) => mm / 25.4 * this.dpiX;

	public getMmToPxScale = () => this.mmToPxScale;

	public getPxToMmScale = () => this.pxToMmScale;
}

export function isI18nable(object: I18nable | string | null | undefined): boolean {
	return typeof object !== 'undefined' && object !== null && typeof object !== 'string' &&
		(typeof object.en === 'string' &&
			typeof object.zh_cn === 'string' &&
			typeof object.zh_tw === 'string');
}

export function getHtmlFromI18nable(object: I18nable): string {
	return `<en>${object.en}</en><zh_cn>${object.zh_cn}</zh_cn><zh_tw>${object.zh_tw}</zh_tw>`;
}

/**
 * <en>Hide html elements by setting the style sheet display to none.</en>
 * <zh_cn>通过设置样式表display到none，来隐藏html元素</zh_cn>
 * <zh_tw>通過設定樣式表display到none，來隱藏html元素</zh_tw>
 * @param element
 * <en>The element you want to hide.</en>
 * <zh_cn>您想要隐藏的元素。</zh_cn>
 * <zh_tw>您想要隱藏的元素。</zh_tw>
 */
export function hide(element: HTMLElement) {
	if (element) element.style.display = 'none';
}

/**
 * <en>Display html elements at block level by setting the style sheet display to block.</en>
 * <zh_cn>通过设置样式表display到block，来以块级方式显示html元素</zh_cn>
 * <zh_tw>通過設定樣式表display到block，來以塊級方式顯示html元素</zh_tw>
 * @param element
 * <en>The element you want to show.</en>
 * <zh_cn>您想要显示的元素。</zh_cn>
 * <zh_tw>您想要顯示的元素。</zh_tw>
 */
export function showBlock(element: HTMLElement) {
	if (element) element.style.display = 'block';
}

/**
 * <en>Display html elements in a row level manner by setting the style sheet display to inline block.</en>
 * <zh_cn>通过设置样式表display到inline-block，来以行级方式显示html元素</zh_cn>
 * <zh_tw>通過設定樣式表display到inline-block，來以行級方式顯示html元素</zh_tw>
 * @param element
 * <en>The element you want to show.</en>
 * <zh_cn>您想要显示的元素。</zh_cn>
 * <zh_tw>您想要顯示的元素。</zh_tw>
 */
export function showInlineBlock(element: HTMLElement) {
	if (element) element.style.display = 'inline-block';
}

/**
 * <en>Display html elements in flexible layout by setting the style sheet display to flex.</en>
 * <zh_cn>通过设置样式表display到flex，来以弹性布局显示html元素</zh_cn>
 * <zh_tw>通過設定樣式表display到flex，來以彈性佈局顯示html元素</zh_tw>
 * @param element
 * <en>The element you want to show.</en>
 * <zh_cn>您想要显示的元素。</zh_cn>
 * <zh_tw>您想要顯示的元素。</zh_tw>
 */
export function showFlex(element: HTMLElement) {
	if (element) element.style.display = 'flex';
}

/**
 * <en>Set the style sheet display to inline flex to display html elements in inline block level elastic layout.</en>
 * <zh_cn>通过设置样式表display到inline-flex，来以内联块级弹性布局显示html元素</zh_cn>
 * <zh_tw>通過設定樣式表display到inline-flex，來以內聯塊級彈性佈局顯示html元素</zh_tw>
 * @param element
 * <en>The element you want to show.</en>
 * <zh_cn>您想要显示的元素。</zh_cn>
 * <zh_tw>您想要顯示的元素。</zh_tw>
 */
export function showInlineFlex(element: HTMLElement) {
	if (element) element.style.display = 'inline-flex';
}

/**
 * <en>Get the corresponding element according to the element ID (an error will occur if there is no element with the corresponding ID)</en>
 * <zh_cn>根据元素id获取相应的元素（不存在相应id的元素时将出错）</zh_cn>
 * <zh_tw>根據元素id獲取相應的元素（不存在相應id的元素時將出錯）</zh_tw>
 * @param id
 * <en>Element id</en>
 * <zh_cn>元素id</zh_cn>
 * <zh_tw>元素id</zh_tw>
 * @returns
 * <en>Corresponding elements</en>
 * <zh_cn>相应html元素</zh_cn>
 * <zh_tw>相應html元素</zh_tw>
 */
export function getElementById(id: string): HTMLElement {
	return document.getElementById(id) as HTMLElement;
}

/**
 * <en>Get the html element through the ID and transfer it to the corresponding sub element according to the tag name.</en>
 * <zh_cn>通过id获取html元素并根据标签名转相应子元素。</zh_cn>
 * <zh_tw>通过id获取html元素并根据标签名转相应子元素。</zh_tw>
 * @param id
 * <en>Element id</en>
 * <zh_cn>元素id</zh_cn>
 * <zh_tw>元素id</zh_tw>
 * @param _tagName
 * <en>Tag name</en>
 * <zh_cn>标签名</zh_cn>
 * <zh_tw>標籤名</zh_tw>
 * @returns
 * <en>Html sub element</en>
 * <zh_cn>html子元素</zh_cn>
 * <zh_tw>html子元素</zh_tw>
 */
export function getElementByIdAndTagName<
	K extends keyof HTMLElementTagNameMap,
>(
	id: string,
	_tagName: K,
) {
	return document.getElementById(id) as HTMLElementTagNameMap[K];
}

/**
 * <en>Get all qualified elements according to the style sheet selector, and convert them to the HTMLElement node list</en>
 * <zh_cn>根据样式表选择器获取所有符合条件的元素，并转为HTMLElement节点清单</zh_cn>
 * <zh_tw>根據樣式表選擇器獲取所有符合條件的元素，並轉為HTMLElement節點清單</zh_tw>
 * @param selectors
 * <en>style sheet selector</en>
 * <zh_cn>样式表选择器</zh_cn>
 * <zh_tw>樣式表選擇器</zh_tw>
 * @returns
 * <en>List of all eligible element nodes</en>
 * <zh_cn>所有符合条件的元素节点清单</zh_cn>
 * <zh_tw>所有符合條件的元素節點清單</zh_tw>
 */
export function querySelectorAll(selectors: string): NodeListOf<HTMLElement> {
	return document.querySelectorAll(selectors);
}

/**
 * <en>Get the list of all element nodes with i18n attributes, and convert the type to add i18n attributes.</en>
 * <zh_cn>获取所有带i18n属性的元素节点清单，转换类型以便添加i18n属性</zh_cn>
 * <zh_tw>獲取所有帶i18n内容的元素節點清單，轉換類型以便添加i18n内容</zh_tw>
 * @returns
 * <en>List of element nodes with i18n attributes that can be added.</en>
 * <zh_cn>可添加i18n属性的、带i18n属性的元素节点清单</zh_cn>
 * <zh_tw>可添加i18n内容的、帶i18n内容的元素節點清單</zh_tw>
 */
export function querySelectorAllByI18n(): NodeListOf<
	HTMLElement & { i18n: I18nable }
> {
	return document.querySelectorAll('[i18n]');
}

/**
 * <en>Get the list of all element nodes with i18n-placeholder attributes, and convert the type to add i18nPlaceholder attributes.</en>
 * <zh_cn>获取所有带i18n-placeholder属性的元素节点清单，转换类型以便添加i18nPlaceholder属性</zh_cn>
 * <zh_tw>獲取所有帶i18n-placeholder内容的元素節點清單，轉換類型以便添加i18nPlaceholder内容</zh_tw>
 * @returns
 * <en>List of element nodes with i18n-placeholder attributes that can be added.</en>
 * <zh_cn>可添加i18nPlaceholder属性的、带i18n-placeholder属性的元素节点清单</zh_cn>
 * <zh_tw>可添加i18nPlaceholder内容的、帶i18n-placeholder内容的元素節點清單</zh_tw>
 */
export function querySelectorAllByI18nPlaceholder(): NodeListOf<
	HTMLElement & { i18nPlaceholder: I18nable }
> {
	return document.querySelectorAll('[i18n-placeholder]');
}

/**
 * <en>Get the corresponding element collection according to the tag name</en>
 * <zh_cn>根据标签名获取相应元素集合</zh_cn>
 * <zh_tw>根據標籤名獲取相應元素集合</zh_tw>
 * @param qualifiedName
 * <en>tag name</en>
 * <zh_cn>标签名</zh_cn>
 * <zh_tw>標籤名</zh_tw>
 * @returns
 * <en>Collection of elements signed with this tag.</en>
 * <zh_cn>使用此标签名的元素集合</zh_cn>
 * <zh_tw>使用此標簽名的元素集合</zh_tw>
 */
export function getElementsByTagName(
	qualifiedName: string,
): HTMLCollectionOf<HTMLElement> {
	return document.getElementsByTagName(qualifiedName) as HTMLCollectionOf<
		HTMLElement
	>;
}

/**
 * <en>Get head element</en>
 * <zh_cn>获取head元素</zh_cn>
 * <zh_tw>獲取head元素</zh_tw>
 * @returns
 * <en>head element</en>
 * <zh_cn>head元素</zh_cn>
 * <zh_tw>head元素</zh_tw>
 */
export function getHeadElement(): HTMLHeadElement {
	return document.getElementsByTagName('head')[0] as HTMLHeadElement;
}

/**
 * <en>Get html element</en>
 * <zh_cn>获取html元素</zh_cn>
 * <zh_tw>獲取html元素</zh_tw>
 * @returns
 * <en>html element</en>
 * <zh_cn>html元素</zh_cn>
 * <zh_tw>html元素</zh_tw>
 */
export function getHtmlElement(): HTMLHtmlElement {
	return document.getElementsByTagName('html')[0] as HTMLHtmlElement;
}

/**
 * <en>Get body element</en>
 * <zh_cn>获取body元素</zh_cn>
 * <zh_tw>獲取body元素</zh_tw>
 * @returns
 * <en>body element</en>
 * <zh_cn>body元素</zh_cn>
 * <zh_tw>body元素</zh_tw>
 */
export function getBodyElement(): HTMLBodyElement {
	return document.getElementsByTagName('body')[0] as HTMLBodyElement;
}

/**
 * <en>Get title element</en>
 * <zh_cn>获取title元素</zh_cn>
 * <zh_tw>獲取title元素</zh_tw>
 * @returns
 * <en>title element</en>
 * <zh_cn>title元素</zh_cn>
 * <zh_tw>title元素</zh_tw>
 */
export function getTitleElement(): HTMLTitleElement & {
	i18n?: { en: string; zh_cn: string; zh_tw: string };
} {
	return document.getElementsByTagName('title')[0] as HTMLTitleElement;
}

/**
 * <en>Get header element</en>
 * <zh_cn>获取header元素</zh_cn>
 * <zh_tw>獲取header元素</zh_tw>
 * @returns
 * <en>The header element, because there is no HTMLHeaderElement object, has to use a similar HTMLDivElement.</en>
 * <zh_cn>header元素，因没有HTMLHeaderElement对象，而只好用相近的HTMLDivElement。</zh_cn>
 * <zh_tw>header元素，因沒有HTMLHeaderElement對象，而只好用相近的HTMLDivElement。</zh_tw>
 */
export function getHeaderElement(): HTMLDivElement {
	return document.getElementsByTagName('header')[0] as HTMLDivElement;
}

/**
 * <en>Get footer element</en>
 * <zh_cn>获取footer元素</zh_cn>
 * <zh_tw>獲取footer元素</zh_tw>
 * @returns
 * <en>The footer element, because there is no HTMLFooterElement object, has to use a similar HTMLDivElement.</en>
 * <zh_cn>footer元素，因没有HTMLFooterElement对象，而只好用相近的HTMLDivElement。</zh_cn>
 * <zh_tw>footer元素，因沒有HTMLFooterElement對象，而只好用相近的HTMLDivElement。</zh_tw>
 */
export function getFooterElement(): HTMLDivElement {
	return document.getElementsByTagName('footer')[0] as HTMLDivElement;
}

/**
 * <en>Get main element</en>
 * <zh_cn>获取main元素</zh_cn>
 * <zh_tw>獲取main元素</zh_tw>
 * @returns
 * <en>The main element, because there is no HTMLMainElement object, has to use a similar HTMLDivElement.</en>
 * <zh_cn>main元素，因没有HTMLMainElement对象，而只好用相近的HTMLDivElement。</zh_cn>
 * <zh_tw>main元素，因沒有HTMLMainElement對象，而只好用相近的HTMLDivElement。</zh_tw>
 */
export function getMainElement(): HTMLDivElement {
	return document.getElementsByTagName('main')[0] as HTMLDivElement;
	// return document.getElementById("main") as HTMLDivElement;
}

/**
 * <en>Creates an element of the specified tag name.</en>
 * <zh_cn>创建指定标签的元素</zh_cn>
 * <zh_tw>創建指定標籤的元素</zh_tw>
 * @param tagName
 * <en>tag name</en>
 * <zh_cn>标签</zh_cn>
 * <zh_tw>標籤</zh_tw>
 * @param options
 * <en>Optional parameters</en>
 * <zh_cn>可选参数</zh_cn>
 * <zh_tw>可選參數</zh_tw>
 * @returns
 * <en>New Elements</en>
 * <zh_cn>新元素</zh_cn>
 * <zh_tw>新元素</zh_tw>
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
	tagName: K,
	options?: ElementCreationOptions,
) {
	return document.createElement<K>(
		tagName,
		options,
	) as HTMLElementTagNameMap[K];
}

/**
 * <en>Set the attbibutes for a element.</en>
 * <zh_cn>设置a元素的属性</zh_cn>
 * <zh_tw>設置a元素的屬性</zh_tw>
 * @param aElement
 * <en>a element</en>
 * <zh_cn>a元素</zh_cn>
 * <zh_tw>a元素</zh_tw>
 * @param href
 * <en>link</en>
 * <zh_cn>链接</zh_cn>
 * <zh_tw>鏈接</zh_tw>
 */
export function setAttributesOfA(aElement: HTMLAnchorElement, link: string) {
	aElement.setAttribute('href', link);
	if (!link.startsWith('mailto:')) {
		aElement.setAttribute('target', '_blank');
	}
}

/**
 * <en>map: string to onclick function</en>
 * <zh_cn>映射：字符串到onclick方法</zh_cn>
 * <zh_tw>映像：字串到onclick方法</zh_tw>
 */
export interface OnclickFunctionMap {
	[index: string]:
		| ((this: GlobalEventHandlers, ev: MouseEvent) => void | boolean)
		| null;
}

/**
 * <en>Stop the event bubble</en>
 * <zh_cn>停止事件冒泡</zh_cn>
 * <zh_tw>停止事件冒泡</zh_tw>
 * @param event
 * <en>event</en>
 * <zh_cn>事件</zh_cn>
 * <zh_tw>事件</zh_tw>
 */
export function stopEventBubble(event: Event): boolean {
	event.cancelBubble = true;
	event.preventDefault();
	event.stopPropagation();
	return false;
}

/**
 * <en>Get html from i18n data</en>
 * <zh_cn>以i18n数据获取html</zh_cn>
 * <zh_tw>以i18n數據獲取html</zh_tw>
 * @param i18n
 * <en>i18n data</en>
 * <zh_cn>i18n数据</zh_cn>
 * <zh_tw>i18n數據</zh_tw>
 */
export function getI18nInnerHTML(
	{ en, zh_cn, zh_tw }: { en: string; zh_cn: string; zh_tw: string },
): string {
	return `<en>${en}</en><zh_cn>${zh_cn}</zh_cn><zh_tw>${zh_tw}</zh_tw>`;
}

/**
 * <en>Transfer date is i18n html</en>
 * <zh_cn>转日期为i18n html</zh_cn>
 * <zh_tw>轉日期為i18n html</zh_tw>
 * @param date
 * <en>Date</en>
 * <zh_cn>日期</zh_cn>
 * <zh_tw>日期</zh_tw>
 */
export function getI18nInnerHTMLFromDate(date: Date): string {
	const en = `${MONTH_NAME_ARRAY[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
	const zh_cn = `${date.getFullYear()}-${
		date.getMonth() +
		1
	}-${date.getDate()}`;
	const zh_tw = zh_cn;
	return `<en>${en}</en><zh_cn>${zh_cn}</zh_cn><zh_tw>${zh_tw}</zh_tw>`;
}

export interface PlaceholderI18nable {
	[lang: string]: string;
}

export function createPageElement() {
	return document.createElement('page');
}

export function createSvgElement(html: string, width: number, height: number) {
	// console.log('createSvgElement', width, height);
	// https://blog.csdn.net/longtengg1/article/details/116784565
	// Don't use: const svgElement = document.createElement('svg');
	const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

	svgElement.innerHTML = html;
	svgElement.setAttribute('version', '1.1');
	svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	// svgElement.setAttribute('style', `width:${width} mm; height:${height} mm; `);
	svgElement.setAttribute('width', `${width}mm`);
	svgElement.setAttribute('height', `${height}mm`);

	return { svgElement, width, height };
}

export function createSvgGElement(html: string, width: number, height: number) {
	const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');

	gElement.innerHTML = html;
	gElement.setAttribute('width', `${width}mm`);
	gElement.setAttribute('height', `${height}mm`);

	return { gElement, width, height };
}

export function createSvgAndGElement(
	{ html, width, height }: { html: string; width: number; height: number },
) {
	const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svgElement.setAttribute('version', '1.1');
	svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

	svgElement.setAttribute('width', `${width}mm`);
	svgElement.setAttribute('height', `${height}mm`);

	const gElement = createSvgGElement(html, width, height).gElement;
	svgElement.appendChild(gElement);

	return { svgElement, gElement, width, height };
}

export function appendSvgAndG(
	parentElement: HTMLElement,
	info: {
		svgElement: SVGSVGElement;
		gElement: SVGGElement;
		width: number;
		height: number;
	},
	options: {
		left: number;
		right: number;
		top: number;
		bottom: number;
		// transform: string,
		degree: number;
	},
) {
	const { abs, sin, cos, PI } = Math;

	const { svgElement, gElement, width, height } = info;
	// const { left, right, top, bottom, transform, degree } = options;
	const { left, right, top, bottom, degree } = options;

	// A3, LANDSCAPE, PAGE_PADDING_TOP, PAGE_PADDING_LEFT, MM_TO_PX_SCALE, PX_TO_MM_SCALE
	const { PAGE_WIDTH, PAGE_HEIGHT } = (window as unknown as { anqiH5PageData: AnQiH5PageData }).anqiH5PageData;

	const x = 'undefined' !== typeof left ? left : PAGE_WIDTH - width - right;
	const y = 'undefined' !== typeof top ? top : PAGE_HEIGHT - height - bottom;
	parentElement.appendChild(svgElement);
	svgElement.setAttribute('x', `${x}mm`);
	svgElement.setAttribute('y', `${y}mm`);

	if (!degree) return;

	// transform: `rotate(${DEGREE_90})`,
	gElement.setAttribute('transform', `rotate(${degree})`);
	gElement.style.transformOrigin = '50% 50%';

	if (degree === 180 || degree === -180) return;

	let newWidth = 0,
		newHeight = 0,
		gTranslateScaleX = 1,
		gTranslateScaleY = 1,
		xScale = 1,
		yScale = 1;

	if (degree <= -90) {
		// -180 < degree <= -90
		const newDegree = -90 - degree;
		const radian = PI * newDegree / 180;
		newWidth = width * sin(radian) + height * cos(radian);
		newHeight = width * cos(radian) + height * sin(radian);
		xScale = -1;
		yScale = -1;
		gTranslateScaleX = -1;
		gTranslateScaleY = 1;
	} else if (degree < 0) {
		// -90 < degree < 0
		const newDegree = -degree;
		const radian = PI * newDegree / 180;
		newWidth = width * cos(radian) + height * sin(radian);
		newHeight = width * sin(radian) + height * cos(radian);
		xScale = -1;
		yScale = 1;
		gTranslateScaleX = 1;
		gTranslateScaleY = 1;
	} else if (degree <= 90) {
		const radian = PI * degree / 180;

		newWidth = width * cos(radian) + height * sin(radian);
		newHeight = width * sin(radian) + height * cos(radian);
		xScale = -1;
		yScale = -1;
		gTranslateScaleX = 1;
		gTranslateScaleY = -1;
	} else if (degree < 180) {
		// 90 < degree < 180
		const newDegree = degree - 90;
		const radian = PI * newDegree / 180;
		newWidth = width * cos(radian) + height * sin(radian);
		newHeight = width * sin(radian) + height * cos(radian);
		xScale = -1;
		yScale = 1;
		gTranslateScaleX = 1;
		gTranslateScaleY = 1;
	}

	const DELTA_WIDTH = newWidth - width;
	const DELTA_HEIGHT = newHeight - height;

	const HALF_DELTA_WIDTH = DELTA_WIDTH * 0.5;
	const HALF_DELTA_HEIGHT = DELTA_HEIGHT * 0.5;

	const G_DELTA_X = HALF_DELTA_WIDTH * gTranslateScaleX;
	const G_DELTA_Y = HALF_DELTA_HEIGHT * gTranslateScaleY;

	if (newWidth < 0 || newHeight < 0) {
		console.log({
			degree,
			cos: cos(degree),
			sin: sin(degree),

			newWidth,
			newHeight,
			x,
			HALF_DELTA_WIDTH,
			fixValueByRight: ('undefined' !== typeof right ? 2 : 1),
			newX: x + HALF_DELTA_WIDTH * ('undefined' !== typeof right ? 2 : 1),
			y,
			HALF_DELTA_HEIGHT,
			newY: y + HALF_DELTA_HEIGHT,
			G_DELTA_X,
			G_DELTA_Y,
		});
	}

	svgElement.setAttribute('width', `${newWidth}mm`);
	svgElement.setAttribute('height', `${newHeight}mm`);

	svgElement.setAttribute(
		'x',
		`${x + HALF_DELTA_WIDTH * xScale * ('undefined' !== typeof right ? 2 : 1)}mm`,
	);
	svgElement.setAttribute('y', `${y + HALF_DELTA_HEIGHT * yScale}mm`);
	gElement.style.translate = `${G_DELTA_X}mm ${G_DELTA_Y}mm`;
}

export function createTopSvgElement() {
	// A3, LANDSCAPE, PAGE_PADDING_TOP, PAGE_PADDING_LEFT, MM_TO_PX_SCALE, PX_TO_MM_SCALE
	const { PAGE_WIDTH, PAGE_HEIGHT } = (window as unknown as { anqiH5PageData: AnQiH5PageData }).anqiH5PageData;

	const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

	svgElement.setAttribute('version', '1.1');
	// svgElement.setAttribute('style', `width:${PAGE_WIDTH} mm; height:${PAGE_HEIGHT} mm; `);
	svgElement.setAttribute('width', `${PAGE_WIDTH}mm`);
	svgElement.setAttribute('height', `${PAGE_HEIGHT}mm`);

	return svgElement;
}

/////////////////////////////////////// Copy from svgHelper.ts

// https://blog.csdn.net/yiyueqinghui/article/details/108004272
export const SVG_NS = 'http://www.w3.org/2000/svg';
export const SVG_XLINKNS = 'http://www.w3.org/1999/xlink';

export type ViewBoxType = {
	left: number;
	right: number;
	top: number;
	bottom: number;
};

export type RotateType = 'auto' | 'auto-reverse' | number;

export type SvgTextInfo = {
	content: I18nable | string;
	x: number;
	y: number;
	rotate: RotateType;
};
export type DivOrSvgElementWithSize = (HTMLDivElement | SVGElement) & {
	widthMm: number;
	heightMm: number;
};
export type WrapElementWithInfo = {
	element: DivOrSvgElementWithSize;
	alone?: boolean;
	linkToPreview?: boolean;
};

export class SvgHelper {
	public static createSvg = (): SVGElement => {
		const svg = document.createElementNS(SVG_NS, 'svg') as SVGElement;
		svg.setAttribute('version', '1.1');
		svg.setAttribute('xmlns', SVG_NS);
		svg.setAttribute('xmlns:xlink', SVG_XLINKNS);
		return svg;
	};
	public static createSvgPath = (): SVGPathElement => {
		return document.createElementNS(SVG_NS, 'path');
	};

	public static appendLine(
		svg: SVGElement,
		STYLE: string,
		x1: number,
		x2: number,
		y1: number,
		y2: number,
		viewBox: ViewBoxType | null,
	) {
		const line = document.createElementNS(
			SVG_NS,
			'line',
		) as SVGLineElement;
		line.setAttribute('x1', `${x1}mm`);
		line.setAttribute('x2', `${x2}mm`);
		line.setAttribute('y1', `${y1}mm`);
		line.setAttribute('y2', `${y2}mm`);

		if (viewBox) {
			viewBox.left = Math.min(viewBox.left, x1, x2);
			viewBox.right = Math.max(viewBox.right, x1, x2);
			viewBox.top = Math.min(viewBox.top, y1, y2);
			viewBox.bottom = Math.max(viewBox.bottom, y1, y2);
		}

		line.setAttribute('style', STYLE);
		svg.appendChild(line);
	}

	public static appendCircle(
		svg: SVGElement,
		STYLE: string,
		cx: number,
		cy: number,
		radius: number,
		viewBox: ViewBoxType | null,
	) {
		const circle = document.createElementNS(
			SVG_NS,
			'circle',
		) as SVGCircleElement;
		circle.setAttribute('cx', `${cx}mm`);
		circle.setAttribute('cy', `${cy}mm`);
		circle.setAttribute('r', `${radius}mm`);
		circle.setAttribute('fill', '#ffffff');

		if (viewBox) {
			viewBox.left = Math.min(viewBox.left, cx - radius);
			viewBox.right = Math.max(viewBox.right, cx + radius);
			viewBox.top = Math.min(viewBox.top, cy - radius);
			viewBox.bottom = Math.max(viewBox.bottom, cy + radius);
		}

		circle.setAttribute('style', STYLE);
		svg.appendChild(circle);
	}

	public static appendTspan(
		text: SVGTextElement,
		STYLE: string,
		CHAR: string,
		dx: string | number,
		dy: string | number,
	) {
		if (typeof dx === 'number') {
			dx = `${dx}mm`;
		}
		if (typeof dy === 'number') {
			dy = `${dy}mm`;
		}

		// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tspan
		const tspan = document.createElementNS(
			SVG_NS,
			'tspan',
		) as SVGTSpanElement;
		// tspan.setAttribute('dx', `${dx}mm`);
		// tspan.setAttribute('dy', `${dy}mm`);
		tspan.setAttribute('dx', `${dx}`);
		tspan.setAttribute('dy', `${dy}`);
		// tspan.setAttribute('rotate', rotate.toString());
		tspan.setAttribute(
			'style',
			STYLE.concat(
				'dominant-baseline:middle;text-anchor:middle;',
				CHAR === '6' || CHAR === '9' ? 'text-decoration:underline;' : '',
				CHAR === 'ü' ? 'opacity:0.85;font-size:0.9em;' : '',
			),
		);

		tspan.innerHTML = CHAR;
		text.appendChild(tspan);
	}

	public static appendText(
		svg: SVGElement,
		STYLE: string,
		content: I18nable | string,
		x: number,
		y: number,
		rotate: RotateType,
		transformOrigin: string,
		viewBox: ViewBoxType | null,
		// deno-lint-ignore no-inferrable-types
		maybeNumber: boolean = false,
	) {
		// const g = document.createElementNS(SVG_NS, 'g') as SVGGElement;
		// g.setAttribute('x', `${x}mm`);
		// g.setAttribute('y', `${y}mm`);
		// g.setAttribute('style', 'display:flex;justify-content:center;align-items:center;overflow:hidden;');
		// if (rotate) {
		// 	g.setAttribute(
		// 		'style',
		// 		`transform: rotate(${rotate}deg);transform-origin:${transformOrigin};`,
		// 	);
		// }

		// svg.appendChild(g);

		const text = document.createElementNS(
			SVG_NS,
			'text',
		) as SVGTextElement;
		text.setAttribute('x', `${x}mm`);
		text.setAttribute('y', `${y}mm`);
		// text.setAttribute(
		// 	'style',
		// 	// 'dominant-baseline:middle;text-anchor:middle;',
		// 	'dominant-baseline:middle;text-anchor:middle;'.concat(rotate ? `transform: rotate(${rotate}deg);transform-origin:${transformOrigin};`: ''),
		// );
		svg.appendChild(text);
		// text.setAttribute('dx', '0');
		// text.setAttribute('dy', '0');
		// text.setAttribute('rotate', rotate.toString());

		if (isI18nable(content)) {
			content = content as I18nable;
			content =
				`<en>${content.en}</en><zh_cn>${content.zh_cn}</zh_cn><zh_tw>${content.zh_tw}</zh_tw>`;
		}

		content = content as string;
		if (content.indexOf('<en>') > -1) {
			const lang = getCurrentLang();
			const startTag = `<${lang}>`;
			const endTag = `</${lang}>`;
			if (content.indexOf(startTag) > -1) {
				content = content.split(startTag)[1].split(endTag)[0];
			}
		}

		// if(CONTENT.indexOf('<') > -1) {
		//   CONTENT = CONTENT.replace(/<br \/>/gi, '<br/>').replace(/<br\/>/gi, '<br>').replace(/\\n/g, '<br>');
		//   if (CONTENT.indexOf('<br>') > -1) {
		//     const fontSize = STYLE.indexOf('font-size:') > -1 ? STYLE.split('font-size:')[1].split(';')[0] : '2mm';
		//     const unit = fontSize.replace(/[0-9.]/gi, '');
		//     const dyNumber = parseFloat(fontSize.replace(unit, ''));
		//     // console.log(fontSize, unit, dyNumber);
		//     const segs = CONTENT.split('<br>');
		//     // let maxLength = 0;
		//     // segs.forEach((seg)=>{ maxLength = Math.max(maxLength, seg.length); });
		//     // const dyOffset = `${dyNumber}${unit}`;
		//     // segs.forEach((seg, index)=>{
		//     //     SvgHelper.appendTspan(text, '', seg, `${(seg.length - maxLength) * 0.5}em`, index ? dyOffset : '0');
		//     // });

		//     let lastLength = 0;
		//     const dyOffset = `${dyNumber}${unit}`;
		//     segs.forEach((seg, index)=>{
		//         // SvgHelper.appendTspan(text, '', seg, index ? `-${(seg.length + lastLength) * 0.5}em` : '0', index ? dyOffset : '0');
		//         SvgHelper.appendTspan(text, '', seg, index ? `-${lastLength}em` : '0', index ? dyOffset : '0');
		//         lastLength = seg.length;
		//     });
		//   } else {
		//     text.innerHTML = CONTENT;
		//   }
		// } else {
		//   CONTENT.split('').forEach((char, index) => {
		//     SvgHelper.appendTspan(text, '', char, '0', '0');
		//   });
		// }

		content = content.replace(/<br \/>/gi, '<br/>').replace(
			/<br\/>/gi,
			'<br>',
		).replace(
			/\\n/gi,
			'<br>',
		);
		if (content.indexOf('<br>') > -1) {
			const fontSize = STYLE.indexOf('font-size:') > -1
				? STYLE.split('font-size:')[1].split(';')[0]
				: '2mm';
			const unit = fontSize.replace(/[0-9.]/gi, '');
			const dyNumber = parseFloat(fontSize.replace(unit, ''));
			// console.log(fontSize, unit, dyNumber);
			const segs = content.split('<br>');
			// let maxLength = 0;
			// segs.forEach((seg)=>{ maxLength = Math.max(maxLength, seg.length); });
			// const dyOffset = `${dyNumber}${unit}`;
			// segs.forEach((seg, index)=>{
			//     // SvgHelper.appendTspan(text, '', seg, index ? `-${seg.length}em` : '0', index ? dyOffset : '0');
			//     SvgHelper.appendTspan(text, '', seg, `${(seg.length - maxLength) * 0.5}em`, index ? dyOffset : '0');
			// });

			let lastLength = 0;
			const dyOffset = `${dyNumber}${unit}`;
			segs.forEach((seg, index) => {
				// SvgHelper.appendTspan(text, '', seg, index ? `-${(seg.length + lastLength) * 0.5}em` : '0', index ? dyOffset : '0');
				SvgHelper.appendTspan(
					text,
					'',
					seg,
					index ? `-${lastLength}em` : '0',
					index ? dyOffset : '0',
				);
				lastLength = seg.length;
			});
		} else {
			if (maybeNumber) {
				content.split('').forEach((char, index) => {
					SvgHelper.appendTspan(text, '', char, '0', '0');
				});
			} else {
				SvgHelper.appendTspan(text, '', content, '0', '0');
			}
		}

		// g.appendChild(text);

		if (viewBox) {
			// left/top/right/bottom/width/height
			const clientRects = text.getClientRects();
			const { left: x1, right: x2, top: y1, bottom: y2 } =
				(clientRects.length ? clientRects.item(0) : text.getBoundingClientRect()) as DOMRect;
			viewBox.left = Math.min(viewBox.left, x1, x2);
			viewBox.right = Math.max(viewBox.right, x1, x2);
			viewBox.top = Math.min(viewBox.top, y1, y2);
			viewBox.bottom = Math.max(viewBox.bottom, y1, y2);
		}

		// STYLE = STYLE.concat('dominant-baseline:middle;text-anchor:middle;'.concat(rotate ? `transform: rotate(${rotate}deg);transform-origin:${transformOrigin};`: ''));
		STYLE = STYLE.concat(
			'dominant-baseline:middle;text-anchor:middle;'.concat(
				rotate ? `transform: rotate(${rotate}deg);transform-origin:${x}mm ${y}mm;` : '',
			),
		);
		text.setAttribute('style', STYLE);
	}

	public static setSvgTextInfo(
		info: SvgTextInfo,
		x: number,
		y: number,
		rotate: RotateType,
	) {
		info.x = x;
		info.y = y;
		info.rotate = rotate;
	}

	public static appendOuterPath(
		svg: SVGElement,
		WIDTH: number,
		HEIGHT: number,
		mmToPxScale: number,
		OUTER_LINE_COLOR: string,
	) {
		svg.setAttribute('width', `${WIDTH}mm`);
		svg.setAttribute('height', `${HEIGHT}mm`);
		// svg.setAttribute('style', `width:${WIDTH}mm;height:${HEIGHT}mm;`);

		const WIDTH_PX = mmToPxScale * WIDTH;
		const HEIGHT_PX = mmToPxScale * HEIGHT;

		const path = SvgHelper.createSvgPath();
		path.setAttribute('fill', 'none');
		path.setAttribute('stroke', OUTER_LINE_COLOR);
		path.setAttribute(
			'd',
			`M 0, 0 `
				.concat(
					`h ${WIDTH_PX} `,
					`v ${HEIGHT_PX} `,
					`h -${WIDTH_PX} `,
					' z',
				),
		);
		svg.appendChild(path);
	}

	public static appendOuterLine(
		svg: SVGElement,
		WIDTH: number,
		HEIGHT: number,
		OUTER_LINE_STYLE: string,
	) {
		svg.setAttribute('width', `${WIDTH}mm`);
		svg.setAttribute('height', `${HEIGHT}mm`);
		// svg.setAttribute('style', `width:${WIDTH}mm;height:${HEIGHT}mm;`);

		const { appendLine } = SvgHelper;
		appendLine(svg, OUTER_LINE_STYLE, 0, WIDTH, 0, 0, null);
		appendLine(svg, OUTER_LINE_STYLE, 0, WIDTH, HEIGHT, HEIGHT, null);
		appendLine(svg, OUTER_LINE_STYLE, 0, 0, 0, HEIGHT, null);
		appendLine(svg, OUTER_LINE_STYLE, WIDTH, WIDTH, 0, HEIGHT, null);
	}

	public static getTextStyleFontSizePatchCss(
		NUMBER: number,
		TEXT_STYLE: string,
	) {
		if (NUMBER > 99 && TEXT_STYLE.indexOf('font-size:') > -1) {
			const fontSizeSeg = TEXT_STYLE.split('font-size:')[1].split(';')[0];
			const fontUnit = fontSizeSeg.replace(/[0-9\.\-]/g, '');
			const fontValue = parseFloat(fontSizeSeg.replace(fontUnit, ''));
			return `font-size:${
				fontValue * 2 /
				NUMBER.toString().length
			}${fontUnit};`;
		}
		return '';
	}
}

//////////////////////////////////// from utils.ts
export const convertDateToYYYYMMDD_hhmmss = (date: Date) => {
	return `${date.getFullYear()}${'0'.concat((date.getMonth() + 1).toString()).substr(-2)}${
		'0'.concat((date.getDate()).toString()).substr(-2)
	}`.concat(
		`_${'0'.concat((date.getHours()).toString()).substr(-2)}${
			'0'.concat((date.getMinutes()).toString()).substr(-2)
		}${'0'.concat((date.getSeconds()).toString()).substr(-2)}`,
	);
};

export function pushSameValueTimes<T>(
	array: Array<T>,
	value: T,
	times: number,
): void {
	for (let i = 0; i < times; ++i) {
		array.push(value);
	}
}

export function repeatString(original: string, times: number): string {
	const array: Array<string> = [];
	for (let i = 0; i <= times; ++i) {
		array.push(original);
	}

	return array.join();
}

export function getArrayRepeatSameValue<T>(value: T, times: number): Array<T> {
	const array: Array<T> = [];
	for (let i = 0; i < times; ++i) {
		array.push(value);
	}
	return array;
}

export const getI18nableWithSameContent = (value: string): I18nable => {
	return { en: value, zh_cn: value, zh_tw: value };
};
