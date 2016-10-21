import {on, off} from 'delegated-events';
import TabPanel from './tab-panel';
import TabTitle from './tab-title';
import {addClass, removeClass, siblings, htmlToDOM} from '../utils';

class TabComponent {
  constructor(targetElement) {
    this._items = [];
    this.element = htmlToDOM(`<div class="tab" role="tablist" aria-live="polite">
      <ul class="tab__header"></ul>
    </div>`);
    this.target = targetElement.appendChild(this.element);
  }

  addPanel(data) {
    const title = new TabTitle(data);
    const panel = new TabPanel(data);

    this._items.push({
      title: title,
      panel: panel,
    });

    // if a title is activated
    title.onStateChange = (title) => {
      this._items.forEach((item) => {
        if (item.panel.data.section === title.data.section) {
          item.panel.enable();
          item.title.enable({omitEvent: true});
        } else {
          item.panel.disable();
          item.title.disable({omitEvent: true});
        }
      });
    };

    // activate the first item
    if (this._items.length === 1) {
      title.enable();
    }

    this.getHeader().appendChild(title.element);
    this.element.appendChild(panel.element);
  }

  getHeader() {
    return this.target.querySelectorAll('.tab__header')[0];
  }
}

export default TabComponent;
