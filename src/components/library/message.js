// 将消息提示全局挂载直接调用
import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'
const div = document.createElement('div');
div.setAttribute('class', 'xtx-message');
document.body.appendChild(div);
let timer = null;


export default ({ type, text }) => {
    const vnode = createVNode(XtxMessage, { type, text });
    render(vnode, div)
    clearTimeout(timer)
    timer = setTimeout(() => {
        render(null, div)
    }, 2000)
}