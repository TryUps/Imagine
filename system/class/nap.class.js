class NapContainer extends HTMLElement {
    constructor() {
       super()
       const shadow = this.attachShadow({mode: 'open'})
       const script = document.createElement('script')
       script.async = true
       script.src = './nap/preload.js'
       //shadow.appendChild(script)
     }
}
 
customElements.define('window-content', NapContainer)