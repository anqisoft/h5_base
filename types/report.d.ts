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
export {};
