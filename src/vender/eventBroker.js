export default function bindData(content, type, selected, fn) {
    if (fn == null) {
        fn = selected;
        selected = null
    }
    content.addEventListener(type, event => {
        const target = event.target
        if (selected) {
            if (target.matches(selected)) {
                fn.call(target, event)
            }
        } else {
            fn.call(target, event)
        }
    })
}