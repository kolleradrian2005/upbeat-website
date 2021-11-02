
/* Custom widgets */

// Header

class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div></div>`;
        fetch('../widgets/header.html')
        .then(response => response.text())
        .then(text =>  {
            this.innerHTML = text;
        })
    }
}
customElements.define('my-header', MyHeader)

// Background

class MyBackground extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<div></div>`;
        fetch('../widgets/background.html')
        .then(response => response.text())
        .then(text =>  {
            this.innerHTML = text;
        })
    }
}
customElements.define('my-background', MyBackground)