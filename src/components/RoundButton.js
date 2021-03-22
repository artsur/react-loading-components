class RoundButton extends HTMLElement {
  constructor() {
    super();
    // элемент создан
    const value = this.value;
    const shadowRoot = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    // браузер вызывает этот метод при добавлении элемента в документ
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  disconnectedCallback() {
    // браузер вызывает этот метод при удалении элемента из документа
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    //console.log(this);
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // вызывается при изменении одного из перечисленных выше атрибутов
  }

  adoptedCallback() {
    // вызывается, когда элемент перемещается в новый документ
    // (происходит в document.adoptNode, используется очень редко)
  }


  render() {
    this.value = this.getAttribute('value') || '&times;';
    let elementContainer = document.createElement('div');
    elementContainer.classList.add('round-button');
    elementContainer.innerHTML = `
      <style>
        .round-button {
          display: inline-block;
          position:relative;
          font-size:24px;
          user-select: none;
        }
  
        .round-button_placeholder {
          box-sizing: border-box;
          visibility: hidden;
          display: block;
          line-height: 1;
          padding: 5px;
        }
  
        .round-button_wrapper {
          box-sizing: border-box;
          display: block;
          overflow: visible;
          position: absolute;
          top:0;
          left:0;
          width: 100%;
          cursor: pointer;
          padding-bottom: 100%;
        }
  
        .round-button_content {
          display: flex;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #ddd;
          border-radius: 50%;
          border: 1px solid #999;
          box-shadow: inset 2px 2px 2px rgba(255,255,255,0.8), inset -2px -2px 2px rgba(0,0,0,0.1) ;
        }
  
        .round-button_content_value {
          display: block;
          text-align: center;
          line-height: 1;
          width:100%;
        }
  
        .round-button:hover .round-button_content {
          background: #ccc;
          border: 1px solid #777;
          box-shadow: inset 3px 3px 2px rgba(255,255,255,0.9), inset -3px -3px 2px rgba(0,0,0,0.2) ;
        }
      </style>  
      <div class="round-button_placeholder">${this.value}</div>  
      <div class="round-button_wrapper">
        <div class="round-button_content">
          <div class="round-button_content_value">${this.value}</div>
        </div>
      </div>
    `;

    this.shadowRoot.appendChild(elementContainer);
  }
}

export default (props)=>{
  let customElementRegistry = window.customElements;
  if(customElementRegistry.get("round-button") === undefined){
    customElementRegistry.define("round-button", RoundButton);
  }
  return <round-button className={props.className} value={props.value ? props.value : '#'} />
};