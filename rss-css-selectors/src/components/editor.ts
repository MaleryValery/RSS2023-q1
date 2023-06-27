import { ComponentCreate } from './ComponentCreate';

class Editor extends ComponentCreate {
  constructor() {
    super('section', 'editor__wrapper');

    const editorCss = new ComponentCreate('div', 'editor-css');
    const editorHeading = new ComponentCreate('div', 'editor__heading');
    const spanTextCss1 = new ComponentCreate('span', 'editor__heading', { textContent: 'CSS Editor' });
    const spanTextCss2 = new ComponentCreate('span', 'editor__heading', { textContent: 'style CSS' });
    const numbersLinesCSS = new ComponentCreate('span', 'editor__lines-numbers');
    const pre = new ComponentCreate('pre', 'code', { textContent: '/*Type in a CSS selector*/' });
    const textArea = new ComponentCreate('textarea', 'editor__text-aria');
    const enterBtn = new ComponentCreate('button', 'enter-button', {
      textContent: 'Enter',
    });
    const viewerCss = new ComponentCreate('div', 'viewer-css');
    const viewerHeading = new ComponentCreate('div', 'editor__heading');
    const spanTextHTML1 = new ComponentCreate('span', 'editor__heading', { textContent: 'HTML viewer' });
    const spanTextHTML2 = new ComponentCreate('span', 'editor__heading', { textContent: 'table.html' });
    const numbersLinesHTML = new ComponentCreate('span', 'viewer__lines-numbers');
    const htmlBox = new ComponentCreate('div', 'html-box');
    const htmlCode = new ComponentCreate('pre', 'html-code');
    this.appendComponent(editorCss, viewerCss);
    editorCss.appendComponent(editorHeading, numbersLinesCSS, pre, textArea, enterBtn);
    editorHeading.appendComponent(spanTextCss1, spanTextCss2);

    viewerCss.appendComponent(viewerHeading, numbersLinesHTML, htmlBox);
    htmlBox.appendComponent(htmlCode);
    viewerHeading.appendComponent(spanTextHTML1, spanTextHTML2);
    this.createLinesNumbers(numbersLinesCSS, numbersLinesHTML);
  }

  protected createLinesNumbers(numbersLinesC: ComponentCreate, numbersLinesH: ComponentCreate): void {
    const lines: number[] = Array(20)
      .fill(0)
      .map((el: number, i) => i + 1);
    lines.forEach((line) => {
      numbersLinesC.newComponent.insertAdjacentHTML('beforeend', `${line}<br>`);
      numbersLinesH.newComponent.insertAdjacentHTML('beforeend', `${line}<br>`);
    });
  }
}

export { Editor };

// <section class = "editor__wrapper">
//         <div class = "editor-css">
//         <div class = "editor__heading">
//           <span>CSS Editor</span>
//           <span>style CSS</span>
//         </div>
//           <div class = "editor__lines-numbers "></div>
//           <pre>/*Type in a CSS selector*/</pre>
//           <textarea class="editor__text-aria"></textarea>
//         </div>
//         <div class = "viewer-css">
//           <div class = "editor__heading">
//             <span>HTML viewer</span>
//             <span>table.html</span>
//           </div>
//           <div class = "viewer__lines-numbers"></div>
//         </div>
//       </section>
//       <section>here is a html structure</section>
//   `,
//   );
//   const linesBoxEditor = document.querySelector('.editor__lines-numbers');
//   const linesBoxViewer = document.querySelector('.viewer__lines-numbers');
//   const lines: number[] = Array(20)
//     .fill(0)
//     .map((el: number, i) => i + 1);

//   lines.forEach((line) => {
//     linesBoxEditor.insertAdjacentHTML('beforeend', `${line}<br>`);
//     linesBoxViewer.insertAdjacentHTML('beforeend', `${line}<br>`);
//   });
