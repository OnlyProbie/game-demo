import { Square } from "../Square";
import $ from 'jquery'
import { IViewer } from "../types";
import PageConfig from "./PageConfig";

$("")
/** 
 * 
 * 显示一个小方块到页面上
 */
export class SquarePageViewer implements IViewer {
    private dom?: JQuery<HTMLElement>  // dom元素
    private isRomve: Boolean = false // 元素是否已经被移除

    constructor (
        private square: Square,
        private container: JQuery<HTMLElement>
    ) {
        
    }
    show (): void {
        if (this.isRomve) return;
        // 设置方块样式
        if (!this.dom) {
            this.dom = $('<div>').css({
                position: 'absolute',
                width: PageConfig.SquareSize.width,
                height: PageConfig.SquareSize.height,
                border: '1px solid ' + PageConfig.SquareSize.borderColor,
                boxSizing: 'border-box'
            }).appendTo(this.container)
        }
        // 设置方块位置
        this.dom.css({
            left: this.square.point.x * PageConfig.SquareSize.width,
            top: this.square.point.y * PageConfig.SquareSize.height,
            background: this.square.color
        })
    }
    remove (): void {
        this.dom?.remove()
    }
}