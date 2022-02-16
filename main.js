const styling = `<style type="text/css">:root{--ifhtml-font:sans-serif}ifhtml-error{color:red;font-family:var(--ifhtml-font)}</style>`

window.onload = function() {
    function error(content) {return `<ifhtml-error>${content}</ifhtml-error>`}
    document.head.insertAdjacentHTML("beforeend", styling)

    for (let i = 0; i < document.querySelectorAll("if").length; i++) {
        // Some Tags
        var ifTag = document.querySelectorAll("if")[i]
        var elseTag = document.querySelectorAll("if ~ else")[i]

        // Main JavaScript
        if (document.querySelectorAll("if ~ else")[i]) {
            if (ifTag.getAttribute("exists") !== null) {
                if (document.querySelectorAll(ifTag.getAttribute("exists")).length !== 0) {
                    elseTag.remove()
                } else {
                    ifTag.remove()
                }
            } else if (ifTag.getAttribute("not-exists") !== null) {
                if (document.querySelectorAll(ifTag.getAttribute("not-exists")).length === 0) {
                    elseTag.remove()
                } else {
                    ifTag.remove()
                }
            } else if (ifTag.getAttribute("equals") !== null) { // Still a Work in Progress!
                if (ifTag.getAttribute("item") !== null) {
                    var item   = ifTag.getAttribute("item")
                    var equals = ifTag.getAttribute("equals")
                    
                    if (isNaN(equals) === false) {
                        equals = parseInt(equals)
                    }
                } else {
                    ifTag.innerHTML = error("<b>item</b> attribute needs to be defined.")
                    elseTag.remove()
                }
            } else if (ifTag.getAttribute("has-child") !== null) {
                if (ifTag.getAttribute("item") !== null) {
                    var parent = ifTag.getAttribute("item")
                    var child  = ifTag.getAttribute("has-child")

                    if (document.querySelectorAll(`${parent} ${child}`).length !== 0) {
                        elseTag.remove()
                    } else {
                        ifTag.remove()
                    }
                } else {
                    ifTag.innerHTML = error("<b>item</b> attribute needs to be defined.")
                    elseTag.remove()
                }
            } else if (ifTag.getAttribute("not-have-child") !== null) {
                if (ifTag.getAttribute("item") !== null) {
                    var parent = ifTag.getAttribute("item")
                    var child  = ifTag.getAttribute("not-have-child")

                    if (document.querySelectorAll(`${parent} ${child}`).length !== 0) {
                        elseTag.remove()
                    } else {
                        ifTag.remove()
                    }
                } else {
                    ifTag.innerHTML = error("<b>item</b> attribute needs to be defined.")
                    elseTag.remove()
                }
            } else if (ifTag.getAttribute("contains") !== null) {
                if (ifTag.getAttribute("item") !== null) {
                    var item = document.querySelectorAll(ifTag.getAttribute("item"))

                    if (item.length !== 0) {
                        for (let ci = 0; ci < item.length; ci++) {
                            var contains = item[ci].innerText.indexOf(ifTag.getAttribute("contains"))
                            if (contains === 0) {
                                elseTag.remove()
                            } else {
                                ifTag.remove()
                            }
                        }
                    } else {
                        ifTag.innerHTML = error(`<b>${ifTag.getAttribute("item")}</b> does not exist.`)
                        elseTag.remove()
                    }
                } else {
                    ifTag.innerHTML = error("<b>item</b> attribute needs to be defined.")
                    elseTag.remove()
                }
            }
        } else {
            ifTag.innerHTML = error("<b>if</b> element needs to be followed by an <b>else</b> element.")
            elseTag.remove()
        }
    }
}
