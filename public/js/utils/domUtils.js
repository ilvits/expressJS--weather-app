let domUtils = {};
(function (context) {
    /**
     * @param {Object} o - object literal with element properties
     */
    context.createEl = function (o, nest) {
        // set type
        let type = o.type || 'div';
        let el = document.createElement(type);

        // iterate therough properties
        for (const key of Object.keys(o)) {
            if (key != 'attrs' && key != 'type') {
                el[key] = o[key];
            }
        }
        if (o.attrs) {
            for (let key of Object.keys(o.attrs)) {
                let value = o.attrs[key];

                if (key != key.toLowerCase) {
                    key = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
                }
                el.setAttribute(key, value);
            }
        }
        if (!nest) {
            return el;
        }
        if (typeof nest === 'string') {
            let t = document.createTextNode(nest);
            el.appendChild(t);
        } else if (nest instanceof Array) {
            for (let i = 0; i < nest.length; i++) {
                if (typeof nest[i] === 'string') {
                    let t = document.createTextNode(nest[i]);
                    el.appendChild(t);
                } else if (nest[i] instanceof Node) {
                    el.appendChild(nest[i]);
                }
            }
        } else if (nest instanceof Node) {
            el.appendChild(nest);
        }
        return el;
    };
})(domUtils);

/* Passive Feature detection */
let passiveIfSupported = false;
try {
    window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', {
            get() {
                passiveIfSupported = { passive: true };
            },
        })
    );
} catch (err) {}
