import { type I18nable, Language } from './h5_base';
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
};
export type AnQiReportData = {
    reportNameI18n: I18nable;
    configData: AnQiReportConfigData;
    configJson: string;
    defaultConfigJson: string;
};
export type AnQiReportConfigData = {
    paperWidth: number;
    paperHeight: number;
    marginTop: number;
    marginLeft: number;
    marginRight: number;
    marginBottom: number;
    otherData: object;
    itemArray: object[];
};
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
