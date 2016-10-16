;((window, document) => {

window._rcs = window._rcs || {};
const rcs = window._rcs;

if (rcs.inst) return;

class Scout {
  constructor(classPrefix, tokenString, displayType, skipLoader) {
    this.prefix = classPrefix || 'rc-scout';
    this.token = tokenString || null;
    this.type = displayType || 'logo_and_text';
    this.skip = skipLoader || false;

    const loader = this.getLoader();
    let targets = document.getElementsByClassName(this.prefix);

    if (!loader && !targets.length) {
      console.error(`[scout] Could not find loader or targets; exiting. Please use your custom snippet to load scout.js, and put at least one div with class '${this.prefix}' on your page.`);
      return;
    } else if (!loader && !this.skip) {
      console.warn('[scout] Could not find loader. Please use your custom snippet to load scout.js; loading directly is not supported.');
    } else if (!targets.length) {
      console.warn(`[scout] Could not find targets; creating one in DOM before loader. Please put at least one div with class '${this.prefix}' on your page.`);
      targets = [this.createTarget(loader)];
    }

    if (!this.token) {
      console.warn('[scout] Could not find valid token; using defaults. Please copy your custom snippet again, making sure to keep the query string (i.e., /loader.js?t=YOUR_TOKEN).');
    }

    const css = this.cssAsString();
    this.renderCss(document.body, css);

    const url = this.makeUrl(loader);
    const html = this.htmlAsString(url);
    this.renderHtml(targets, html);
  }

  /* util */

  getLoader() {
    const scripts = document.getElementsByTagName('script');

    for (let i = 0, l = scripts.length; i < l; i++) {
      const el = scripts[i];
      if (el.src && /www\.recurse-scout\.(dev|com)\/loader\.js/.test(el.src)) {
        return el;
      }
    }

    return null;
  }

  createTarget(loader) {
    const div = document.createElement('div');

    div.className = this.prefix;
    loader.parentNode.insertBefore(div, loader);

    return div;
  }

  makeUrl(loader) {
    let base;

    if (loader && loader.src && /www\.recurse-scout\.dev/.test(loader.src)) {
      base = 'http://www.recurse.dev/scout/click';
    } else if (!loader && /www\.recurse\.dev/.test(window.location.hostname)) {
      base = 'http://www.recurse.dev/scout/click';
    } else {
      base = 'https://www.recurse.com/scout/click';
    }

    return base + (this.token ? '?t=' + encodeURIComponent(this.token) : '');
  }

  createStyle(css) {
    const style = document.createElement('style');

    style.className = `${this.prefix}__style`;
    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css; // for IE
    } else {
      style.appendChild(document.createTextNode(css));
    }

    return style;
  }

  /* render */

  renderCss(target, css) {
    const style = this.createStyle(css);
    target.appendChild(style);
  }

  renderHtml(targets, html) {
    for (let i = 0, l = targets.length; i < l; i++) {
      targets[i].innerHTML = html;
    }
  }

  /* templates */

  cssAsString() {
    const { type, prefix } = this;

    if (!(type && prefix)) {
      throw new Error('could not get css as string');
    }

    const COLOR_LOGO_XML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 15"><rect x="0" y="0" width="12" height="10" fill="#000"></rect><rect x="1" y="1" width="10" height="8" fill="#fff"></rect><rect x="2" y="2" width="8" height="6" fill="#000"></rect><rect x="2" y="3" width="1" height="1" fill="#61ae24"></rect><rect x="4" y="3" width="1" height="1" fill="#61ae24"></rect><rect x="6" y="3" width="1" height="1" fill="#61ae24"></rect><rect x="3" y="5" width="2" height="1" fill="#61ae24"></rect><rect x="6" y="5" width="2" height="1" fill="#61ae24"></rect><rect x="4" y="9" width="4" height="3" fill="#000"></rect><rect x="1" y="11" width="10" height="4" fill="#000"></rect><rect x="0" y="12" width="12" height="3" fill="#000"></rect><rect x="2" y="13" width="1" height="1" fill="#fff"></rect><rect x="3" y="12" width="1" height="1" fill="#fff"></rect><rect x="4" y="13" width="1" height="1" fill="#fff"></rect><rect x="5" y="12" width="1" height="1" fill="#fff"></rect><rect x="6" y="13" width="1" height="1" fill="#fff"></rect><rect x="7" y="12" width="1" height="1" fill="#fff"></rect><rect x="8" y="13" width="1" height="1" fill="#fff"></rect><rect x="9" y="12" width="1" height="1" fill="#fff"></rect></svg>';
    const COLOR_LOGO_DATA = 'data:image/svg+xml;utf8,' + encodeURIComponent(COLOR_LOGO_XML);

    const MUTED_LOGO_XML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 15"><rect x="0" y="0" width="12" height="10" fill="#000"></rect><rect x="1" y="1" width="10" height="8" fill="#fff"></rect><rect x="2" y="2" width="8" height="6" fill="#000"></rect><rect x="2" y="3" width="1" height="1" fill="#666"></rect><rect x="4" y="3" width="1" height="1" fill="#666"></rect><rect x="6" y="3" width="1" height="1" fill="#666"></rect><rect x="3" y="5" width="2" height="1" fill="#666"></rect><rect x="6" y="5" width="2" height="1" fill="#666"></rect><rect x="4" y="9" width="4" height="3" fill="#000"></rect><rect x="1" y="11" width="10" height="4" fill="#000"></rect><rect x="0" y="12" width="12" height="3" fill="#000"></rect><rect x="2" y="13" width="1" height="1" fill="#fff"></rect><rect x="3" y="12" width="1" height="1" fill="#fff"></rect><rect x="4" y="13" width="1" height="1" fill="#fff"></rect><rect x="5" y="12" width="1" height="1" fill="#fff"></rect><rect x="6" y="13" width="1" height="1" fill="#fff"></rect><rect x="7" y="12" width="1" height="1" fill="#fff"></rect><rect x="8" y="13" width="1" height="1" fill="#fff"></rect><rect x="9" y="12" width="1" height="1" fill="#fff"></rect></svg>';
    const MUTED_LOGO_DATA = 'data:image/svg+xml;utf8,' + encodeURIComponent(MUTED_LOGO_XML);

    const CSS = {
      logo_and_text: `
        .${prefix} {
          display: block;
          padding: 0;
          border: 0;
          margin: 0;
        }
        .${prefix}__text {
          display: block;
          padding: 0;
          border: 0;
          margin: 0;
          height: 100%;
          font-size: 100%;
        }
        .${prefix}__logo {
          display: inline-block;
          padding: 0;
          border: 0;
          margin: 0;
          width: 0.85em;
          height: 0.85em;
          background: no-repeat center url('${COLOR_LOGO_DATA}');
        }
        .${prefix}__link:link, .${prefix}__link:visited {
          color: #61ae24;
          text-decoration: underline;
        }
        .${prefix}__link:hover, .${prefix}__link:active {
          color: #4e8b1d;
        }
      `,
      logo_only: `
        .${prefix} {
          display: inline;
          padding: 0;
          border: 0;
          margin: 0;
          width: 40px;
          height: 55px;
        }
        .${prefix}__logo {
          display: block;
          padding: 0;
          border: 0;
          margin: 0;
          height: 100%;
          background: no-repeat center url('${MUTED_LOGO_DATA}');
        }
        .${prefix}__logo:hover {
          background: no-repeat center url('${COLOR_LOGO_DATA}');
        }
      `,
      text_only: `
        .${prefix} {
          display: block;
          padding: 0;
          border: 0;
          margin: 0;
        }
        .${prefix}__text {
          display: block;
          padding: 0;
          border: 0;
          margin: 0;
          height: 100%;
          font-size: 100%;
        }
        .${prefix}__link:link, .${prefix}__link:visited {
          color: #61ae24;
          text-decoration: underline;
        }
        .${prefix}__link:hover, .${prefix}__link:active {
          color: #4e8b1d;
        }
      `,
    };

    if (!CSS.hasOwnProperty(type)) {
      throw new Error(`could not get css as string for display type ${type}`);
    }

    return CSS[type]
      .replace(/^\n/, '')
      .replace(/^ {8}/gm, '')
      .replace(/ {6}$/, '');
  }

  htmlAsString(url) {
    const { type, prefix } = this;

    if (!(type && prefix && url)) {
      throw new Error('could not get html as string');
    }

    const HTML = {
      logo_and_text: `<p class="${prefix}__text"><i class="${prefix}__logo"></i> Want to become a better programmer? <a class="${prefix}__link" href="${url}">Join the Recurse Center!</a></p>`,
      logo_only: `<a class="${prefix}__link" href="${url}"><div class="${prefix}__logo"></div></a>`,
      text_only: `<p class="${prefix}__text">Want to become a better programmer? <a class="${prefix}__link" href="${url}">Join the Recurse Center!</a></p>`,
    };

    if (!HTML.hasOwnProperty(type)) {
      throw new Error(`could not get html as string for display type ${type}`);
    }

    return HTML[type];
  }
}

rcs.Scout = Scout; // export
rcs.inst = new Scout(rcs.prefix, rcs.token, rcs.type, rcs.skip);

})(window, document);