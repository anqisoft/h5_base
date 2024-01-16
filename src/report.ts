/*
 * Copyright (c) 2023 anqisoft@gmail.com
 * report.ts
 *
 * <en>
 * Created on Sun Nov 05 2023 11:39:01
 * Feature: Provides a mechanism for report pages to receive messages. After receiving the message, 
 * you can update the page language, title, style sheet or report content, or call the print function.
 * </en>
 *
 * <zh_cn>
 * 创建：2023年11月5日 11:39:01
 * 功能：提供报表页接收消息的机制。当收到消息后，可更新此页面语言、标题、样式表或报表内容，或调用打印功能。
 * </zh_cn>
 *
 * <zh_tw>
 * 創建：2023年11月5日 11:39:01
 * 功能：提供報表頁接收訊息的機制。 收到訊息後，可更新此頁面語言、標題、樣式表或報表內容，或呼叫列印功能。
 * </zh_tw>
 */

/**
 * <en>language</en>
 * <zh_cn>语言</zh_cn>
 * <zh_tw>語言</zh_tw>
 */
type Language = 'en' | 'zh_cn' | 'zh_tw';

/**
 * <en>Internationalizable</en>
 * <zh_cn>可国际化</zh_cn>
 * <zh_tw>可國際化</zh_tw>
 */
type I18nable = {
	en: string;
	zh_cn: string;
	zh_tw: string;
};

/**
 * <en>Report message core data:<br>
  * lang: The language used by the page, associated with the data-lang attribute of the html tag. <br>
  * title: page title, associated with the content of the title tag in the head. <br>
  * css: page style sheet, associated with the style tag content whose id is style. <br>
  * html: report html, associated with the content of the div element with the ID report_wrapper.
 * </en>
 * 
 * <zh_cn>报表消息核心数据：<br>
 * lang: 页面所用语言，关联html标签的data-lang属性。<br>
 * title: 页面标题，关联head中title标签内容。<br>
 * css: 页面样式表，关联id为style的style标签内容。<br>
 * html: 报表html，关联id为report_wrapper的div元素内容。
 * </zh_cn>
 * 
 * <zh_tw>報表訊息核心資料：<br>
  * lang: 頁面所用語言，關聯html標籤的data-lang屬性。 <br>
  * title: 頁面標題，關聯head中title標籤內容。 <br>
  * css: 頁面樣式表，關聯id為style的style標籤內容。 <br>
  * html: 報表html，關聯id為report_wrapper的div元素內容。
 * </zh_tw>
 */
export type AnQiReportMessageCoreData = {
	lang: Language;
	title: I18nable;
	css: string;
	html: string;
};

/**
 * <en>Report message data:<br>
  * The first layer of data comes from industry conventions, and the lower layer command and data are defined by me. <br>
  * command: command name, used to specify the name of the message received. <br>
  * data: data, used to specify the data of the message being delivered.
 * </en>
 * 
 * <zh_cn>报表消息数据：<br>
 * 第一层data来自于业内约定，下层command和data则由我定义。<br>
 * 1. command：命令名，用于指定所接收的消息的名称。共有四个：<br>
 * 1) build：生成报表，以所传递的lang、title、css、html更新页面相应内容。<br>
 * 2) changeCss：更新样式表，以所传递的css，更新id为style的style标签内容。<br>
 * 3) changeLang：生成报表，以所传递的lang，更新html标签的data-lang属性及标签。<br>
 * 4) print：调用页面的打印功能，即window.print()。<br>
 * data：数据，用于指定所传递的消息的数据。
 * </zh_cn>
 * 
 * <zh_tw>報表訊息資料：<br>
  * 第一層data來自於業界約定，下層command和data則由我定義。 <br>
  * command：命令名，用於指定所接收的訊息的名稱。 <br>
  * data：數據，用於指定所傳遞的訊息的數據。
 * </zh_tw>
 */
export type AnQiReportMessageData = {
	data: {
		command: string;
		data: AnQiReportMessageCoreData;
	};
};

// Window: message event. https://developer.mozilla.org/en-US/docs/Web/API/Window/message_event
{
	/**
	 * <en>Pages are prohibited from being used independently and must be nested in other pages.</en>
	 * <zh_cn>禁止页面独立使用，必须嵌套于其它页面中。</zh_cn>
	 * <zh_tw>禁止頁面獨立使用，必須嵌套於其它頁面中。</zh_tw>
	 */
	if (window === window.top) {
		window.location.href = 'index.htm';
	}

	/**
	 * <en>Register message event and receive messages (build, changeCss, changeLang, print).</en>
	 * <zh_cn>注册message事件，接收消息（build、changeCss、changeLang、print）。</zh_cn>
	 * <zh_tw>註冊message事件，接收訊息（build、changeCss、changeLang、print）。</zh_tw>
	 */
	(window as unknown as {
		addEventListener: (event_name: string, func: (event: Event) => void) => void;
	}).addEventListener('message', function (event: Event) {
		const {
			data: {
				command,
				data: {
					lang,
					title,
					css,
					html,
				},
			},
		} = event as unknown as AnQiReportMessageData;

		switch (command) {
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

	/** <en>The style element whose id is "style" is used to receive dynamically changing style sheets.</en>
	 * <zh_cn>id为style的style元素，用于接收动态变化的样式表。</zh_cn>
	 * <zh_tw>d為style的style元素，用來接收動態變化的樣式表。</zh_tw>
	 */
	const styleElement = document.getElementById('style') as HTMLStyleElement;
	/** <en>The div element whose id is "report_wrapper" is used to dynamically change report content.</en>
	 * <zh_cn>id为report_wrapper的div元素，用于动态改变报表内容。</zh_cn>
	 * <zh_tw>id為report_wrapper的div元素，用於動態改變報表內容。</zh_tw>
	 */
	const reportElement = document.getElementById('report_wrapper') as HTMLDivElement;
	/** <en>The page title element, used for the file name of the generated file report.</en>
	 * <zh_cn>页面标题元素，用于所生成的文件式报表的文件名。</zh_cn>
	 * <zh_tw>頁標題元素，用於所產生的文件式報表的檔案名稱。</zh_tw> 
	 */
	const titleElement = document.getElementsByTagName('title')[0] as HTMLTitleElement;
	/** <en>The html element, whose "data-lang" attribute is used to switch the multi-language content displayed on the page.</en>
	 * <zh_cn>html元素，data-lang属性用于切换页面所显示的多语言内容。</zh_cn>
	 * <zh_tw>html元素，data-lang屬性用來切換頁面所顯示的多語言內容。</zh_tw>
	 */
	const htmlElement = document.getElementsByTagName('html')[0] as HTMLHtmlElement;

	/**
	 * <en>Update report content: Set page language, title, dynamic style sheet and multi-language content at the same time.</en>
	 * <zh_cn>更新报表内容：同时设置页面语言、标题、动态样式表与多语言内容。</zh_cn>
	 * <zh_tw>更新報表內容：同時設定頁面語言、標題、動態樣式表與多語言內容。</zh_tw>
	 * @param lang <en>Page lang</en><zh_cn>页面语言</zh_cn><zh_tw>頁面語言</zh_tw>
	 * @param title 
	 * 	<en>The page title needs to be passed in multi-language content so that when the page language is changed, 
	 * 	it will automatically switch to the page title in the corresponding language - this directly corresponds to 
	 * 	the file name of the file-based report.</en>
	 * 	<zh_cn>页面标题，需传入多语言内容，以便更改页面语言时，自动切换到对应语言的页面标题——这与文件式报表的文件名直接对应。</zh_cn>
	 * 	<zh_tw>頁面標題，需傳入多語言內容，以便更改頁面語言時，自動切換到對應語言的頁面標題－這與文件式報表的檔案名稱直接對應。</zh_tw>
	 * @param css 
	 * 	<en>Dynamic style sheet, used to control printing-related style sheets.</en>
	 * 	<zh_cn>动态样式表，用于控制打印相关样式表。</zh_cn>
	 * 	<zh_tw>動態樣式表，用於控制列印相關樣式表。</zh_tw>
	 * @param html 
	 * 	<en>Multilingual content, the html content of the report element, can contain multilingual tags to 
	 * 	automatically switch when the page language is switched.</en>
	 * 	<zh_cn>多语言内容，报表元素的html内容，可包含多语言标签，以便切换页面语言时自动切换。</zh_cn>
	 * 	<zh_tw>多語言內容，報表元素的html內容，可包含多語言標籤，以便在切換頁面語言時自動切換。</zh_tw>
	 */
	const updateReport = (lang: Language, title: I18nable, css: string, html: string) => {
		htmlElement.setAttribute('data-lang', lang);

		((titleElement as unknown) as { i18n: I18nable }).i18n = title;
		titleElement.innerHTML = title[lang];

		styleElement.innerHTML = css;
		reportElement.innerHTML = html;
	};


	/**
	 * <en>Changing the page language will automatically modify the page title and displayed multi-lingual content.</en>
	 * <zh_cn>更改页面语言，将自动修改页面标题，及所显示的多语言内容。</zh_cn>
	 * <zh_tw>變更頁面語言，將自動修改頁面標題，及所顯示的多語言內容。</zh_tw>
	 * @param lang <en>Page lang</en><zh_cn>页面语言</zh_cn><zh_tw>頁面語言</zh_tw>
	 */
	const changeLang = (lang: Language) => {
		htmlElement.setAttribute('data-lang', lang);
		const i18n = ((titleElement as unknown) as { i18n: I18nable }).i18n;
		if (typeof i18n !== 'undefined') {
			titleElement.innerHTML = i18n[lang];
		}
	};
}
