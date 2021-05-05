import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import { toPng } from 'html-to-image';
import {get, set} from 'lodash';

export enum paperSizes {
  A2 = 'A2',
  A3 = 'A3',
  A4 = 'A4',
}

class ExportDomToPdfOptions {
  fileName: string = 'default.pdf';
  paperSize: paperSizes = paperSizes.A4;
  fittingPaperSize?: paperSizes;
  contentMargin?: number;
  excludeClassNames?: Array<string>;
  onProcessEnd?: Function;
  setProgressState?: Function;
}

const DEFAULT_CONTENT_MARGIN = 0;

export class ExportDomToPdf {
  static export = async (node: any, options: ExportDomToPdfOptions) => {
    const {fileName, paperSize, fittingPaperSize, contentMargin, setProgressState} = options;

    const paperDetails = get(PAPER_METRICS, paperSize);

    setProgressState?.(true);

    const nodeWidth = node.getBoundingClientRect().width;

    let overlay = ExportDomToPdf.createElement('div', {
      style: overlayCSS
    });

    let container = ExportDomToPdf.createElement('div', {
      style: {
        ...containerCSS,
        width: `${nodeWidth}px`
      }
    });

    container.appendChild(ExportDomToPdf.cloneNode(node));
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    if(fittingPaperSize) {
      ExportDomToPdf.adjustInnerElementsPosition(container, fittingPaperSize, contentMargin || DEFAULT_CONTENT_MARGIN);
    }

    const containerWidth = container.getBoundingClientRect().width;

    let elementsToConvert: Array<any> = container.querySelectorAll('[data-convert-to-canvas]');

    for (const element of Array.from(elementsToConvert)) {
      const canvas: any = await html2canvas(element, {
        backgroundColor: null
      });

      element.parentNode.insertBefore(canvas, element);
      element.parentNode.removeChild(element);
    }

    elementsToConvert = container.querySelectorAll('svg');

    for (const element of Array.from(elementsToConvert)) {
      const dataUrl = await toPng(element);
      const img: any = new Image();
      img.src = dataUrl;

      element.parentNode.insertBefore(img, element);
      element.parentNode.removeChild(element);
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: paperDetails.id,
      compress: true
    });

    await doc.html(container, {
      callback: (doc) => {
        doc.save(fileName);

        setProgressState?.(false);
        document.body.removeChild(overlay);
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
      ],
      html2canvas: {
        backgroundColor: null,
        scale: paperDetails.width / containerWidth
      }
    });
  }

  private static createElement = (tagName: string, options: any) => {
    const {className, style} = options;

    let element: any = document.createElement(tagName);

    if (className) {
      element.className = className;
    }

    if (style) {
      for (let key in style) {
        set(element, `style.${key}`, get(style, key));
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

  private static adjustInnerElementsPosition = (node: any, fittingPaperSize: paperSizes, contentMargin: number) => {
    const PAPER_HEIGHT = get(PAPER_METRICS, `${fittingPaperSize}.height`);
    let breakableElements = node.querySelectorAll('[data-breakpoint]');
    breakableElements = Array.from(breakableElements);

    if(breakableElements.length) {
      breakableElements.forEach((element: any, index: number) => {
        const currentElementBoundingRect = element.getBoundingClientRect();

        const currentElementStartingPage = Math.floor((currentElementBoundingRect.top) / (PAPER_HEIGHT));
        const currentElementEndingPage = Math.floor((currentElementBoundingRect.bottom) / (PAPER_HEIGHT));

        if(currentElementStartingPage !== currentElementEndingPage) {
          const nextElement = breakableElements?.[index + 1];

          let nextElementStartingPage;
          let innerBreakableElements;

          if(nextElement) {
            const nextElementBoundingRect = nextElement.getBoundingClientRect();

            nextElementStartingPage = Math.floor((nextElementBoundingRect.top) / (PAPER_HEIGHT));

            innerBreakableElements = element.querySelectorAll(':scope [data-breakpoint]');
            innerBreakableElements = Array.from(innerBreakableElements);
          }


          if(!innerBreakableElements?.includes(nextElement) || currentElementStartingPage !== nextElementStartingPage) {
            //Push to next page
            let correctionToApply = (currentElementStartingPage + 1) * PAPER_HEIGHT - currentElementBoundingRect.top;
            correctionToApply += 2 * contentMargin;

            element.style.paddingTop = `${correctionToApply}px`;
          }
        }
      });
    }
  }
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

const PAPER_METRICS: any = {
  A2: {
    id: 'a2',
    width: 1191,
    height: 1684
  },
  A3: {
    id: 'a3',
    width: 842,
    height: 1191
  },
  A4: {
    id: 'a4',
    width: 595,
    height: 842
  }
}