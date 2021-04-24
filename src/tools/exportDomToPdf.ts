// import domtoimage from 'dom-to-image';
import {jsPDF} from "jspdf";
// import html2canvas from "html2canvas";

const a4HeightCm = 297;
const a4WidthCm = 210;
const a4Ratio = a4HeightCm / a4WidthCm;
//
// const inchToCmRation = 2.54;
//
// const a4Height = 595.28;
// const a4Width = 841.89;

enum COMPRESSION_MODE {
  NONE = 'NONE',
  FAST = 'FAST',
  MEDIUM = 'MEDIUM',
  SLOW = 'SLOW',
}

class ExportDomToPdfOptions {
  fileName: string = 'default.pdf';
  overrideWidth?: number;
  excludeClassNames?: Array<string>;
  compression?: COMPRESSION_MODE = COMPRESSION_MODE.NONE;
}

export default class ExportDomToPdf {
  static export = (node: any, options: ExportDomToPdfOptions, onProcessEnd?: Function) => {
    const {overrideWidth, excludeClassNames, fileName} = options;

    let overlay = ExportDomToPdf.createElement('div', {
      style: overlayCSS
    });

    let container = ExportDomToPdf.createElement('div', {
      style: containerCSS
    });

    container.appendChild(ExportDomToPdf.cloneNode(node));
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    const containerWidth = overrideWidth || container.getBoundingClientRect().width;
    const calculatedPageHeight = Math.floor(containerWidth * a4Ratio);

    const elements: Array<any> = container.querySelectorAll('[data-breakpoint]');

    elements.forEach((element: any) => {
      const rules: any = {
        before: false,
        after: false,
        avoid: true
      };

      const elementClientRect = element.getBoundingClientRect();

      if (rules.avoid && !rules.before) {
        const startPage = Math.floor(elementClientRect.top / calculatedPageHeight);
        const endPage = Math.floor(elementClientRect.bottom / calculatedPageHeight);
        const nPages = Math.abs(elementClientRect.bottom - elementClientRect.top) / calculatedPageHeight;
        // Turn on rules.before if the el is broken and is at most one page long.
        if (endPage !== startPage && nPages <= 1) {
          rules.before = true;
        }
        // Before: Create a padding div to push the element to the next page.
        if (rules.before) {
          const pad = ExportDomToPdf.createElement('div', {
            style: {
              display: 'block',
              height: `${calculatedPageHeight - elementClientRect.top % calculatedPageHeight}px`
            }
          });
          return element.parentNode.insertBefore(pad, element);
        }
      }
    });

    // const filterFn = (args: any) => {
    //   const {classList, tagName} = args;
    //   let ref;
    //   let ref1;
    //
    //   if (classList && excludeClassNames) {
    //     for (let j = 0, classListLength = excludeClassNames.length; j < classListLength; j++) {
    //       const className = excludeClassNames[j];
    //
    //       if (classList.indexOf(className) >= 0) {
    //         return false;
    //       }
    //     }
    //   }
    //
    //   return (ref = (ref1 = tagName) != null ? ref1.toLowerCase() : void 0) !== 'button' && ref !== 'input' && ref !== 'select';
    // };

    const doc = new jsPDF('portrait', 'px', 'a2');

    doc.html(container, {
      callback: (doc) => {
        doc.save(fileName);
      },
      x: 0,
      y: 0,
      filename: fileName,
      fontFaces: [
        {
          family: 'Montserrat',
          src: [{
            url: '/static/media/Montserrat-Regular.3cd78665.ttf',
            format: 'truetype'
          }],
          weight: 400
        },
        {
          family: 'Montserrat',
          src: [{
            url: '/static/media/Montserrat-Medium.e2d60bc4.ttf',
            format: 'truetype'
          }],
          weight: 500
        },
        {
          family: 'Montserrat',
          src: [{
            url: '/static/media/Montserrat-SemiBold.fa8441f3.ttf',
            format: 'truetype'
          }],
          weight: 600
        }
      ]
    });

    // return html2canvas(container)
    //   .then(canvas => {
    //     // Remove overlay
    //     document.body.removeChild(overlay);
    //
    //     // Initialize the PDF.
    //     const pdf = new jsPDF('portrait', 'px', 'a4');
    //
    //     // Calculate the number of pages.
    //     const pxFullHeight = canvas.height;
    //     const nPages = Math.ceil(pxFullHeight / calculatedPageHeight);
    //
    //     // Define pageHeight separately so it can be trimmed on the final page.
    //
    //     let pageHeight = a4Height;
    //     const pageCanvas = document.createElement('canvas');
    //     const pageCtx: any = pageCanvas.getContext('2d');
    //     pageCanvas.width = canvas.width;
    //     pageCanvas.height = calculatedPageHeight;
    //
    //     let h;
    //     let w;
    //     let imgData;
    //     let page = 0;
    //
    //     while (page < nPages) {
    //       if (page === nPages - 1 && pxFullHeight % calculatedPageHeight !== 0) {
    //         pageCanvas.height = pxFullHeight % calculatedPageHeight;
    //         pageHeight = pageCanvas.height * a4Height / pageCanvas.width;
    //       }
    //       w = pageCanvas.width;
    //       h = pageCanvas.height;
    //       pageCtx.fillStyle = 'white';
    //       pageCtx.fillRect(0, 0, w, h);
    //       pageCtx.drawImage(canvas, 0, page * calculatedPageHeight, w, h, 0, 0, w, h);
    //       // Don't create blank pages
    //       if (ExportDomToPdf.isCanvasBlank(pageCanvas)) {
    //         ++page;
    //         continue;
    //       }
    //       // Add the page to the PDF.
    //       if (page) {
    //         pdf.addPage();
    //       }
    //       imgData = pageCanvas.toDataURL('image/PNG');
    //       pdf.addImage(imgData, 'PNG', 0, 0, a4Width, a4Height, undefined, compression);
    //       ++page;
    //     }
    //
    //     onProcessEnd?.();
    //
    //     return pdf.save(fileName);
    //   }).catch(error => {
    //     document.body.removeChild(overlay);
    //
    //     onProcessEnd?.();
    //
    //     return console.error(error);
    //   });
  }

  private static createElement = (tagName: string, options: any) => {
    const {className, innerHTML, style} = options;

    let element: any = document.createElement(tagName);

    if (className) {
      element.className = className;
    }

    if (innerHTML) {
      element.innerHTML = innerHTML;
      let scripts: Array<any> = element.getElementsByTagName('script');
      let i = scripts.length;

      while (i-- > 0) {
        scripts[i].parentNode.removeChild(scripts[i]);
      }
    }

    if (style) {
      for (let key in style) {
        element.style[key] = style[key];
      }
    }

    return element;
  };

  private static cloneNode = (node: any, isJavascriptEnabled?: boolean) => {
    let child: any = node.firstChild;
    let clone: any = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

    while (child) {
      if (isJavascriptEnabled || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
        clone.appendChild(ExportDomToPdf.cloneNode(child, isJavascriptEnabled));
      }
      child = child.nextSibling;
    }

    if (node.nodeType === 1) {
      if (node.nodeName === 'CANVAS') {
        clone.width = node.width;
        clone.height = node.height;
        clone.getContext('2d').drawImage(node, 0, 0);
      } else if (node.nodeName === 'TEXTAREA' || node.nodeName === 'SELECT') {
        clone.value = node.value;
      }

      clone.addEventListener('load', (() => {
        clone.scrollTop = node.scrollTop;
        clone.scrollLeft = node.scrollLeft;
      }), true);
    }

    return clone;
  }

  private static isCanvasBlank = (canvas: any) => {
    let blank = document.createElement('canvas');
    let ctx: any = blank.getContext('2d');
    ;

    blank.width = canvas.width;
    blank.height = canvas.height;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, blank.width, blank.height);
    return canvas.toDataURL() === blank.toDataURL();
  };
}

const containerCSS: any = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  height: 'auto',
  margin: 'auto',
  overflow: 'auto',
  backgroundColor: 'white'
};

const overlayCSS: any = {
  position: 'fixed',
  zIndex: 1000,
  opacity: 0,
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  backgroundColor: 'rgba(0,0,0,0.8)'
};