import 'highlight.js/scss/tokyo-night-light.scss';
import { ILevels } from './utils/interface';
import { View } from './view';
/* eslint-disable @typescript-eslint/no-var-requires */
const hljs = require('highlight.js/lib/common');

class Editor extends View {
  public editor!: HTMLElement;

  public editorCss!: HTMLElement;

  public editorHTML!: HTMLElement;

  public textArea!: HTMLTextAreaElement;

  public htmlCode!: HTMLElement;

  public enterBtn!: HTMLElement;

  public codeTag!: HTMLElement;

  public textPre!: HTMLTextAreaElement;

  public textCode!: HTMLTextAreaElement;

  public render(parent: HTMLElement): void {
    this.editor = super.renderComponent('div', 'editor__wrapper', { id: 'editor' });

    this.editorCss = super.renderComponent('div', 'editor-css');
    const editorHeading = super.renderComponent('div', 'editor__heading');
    const spanTextCss = super.renderComponent('span', 'editor__heading', { textContent: 'CSS Editor' });
    const numbersLinesCSS = super.renderComponent('span', 'editor__lines-numbers');
    const pre = super.renderComponent('div', 'code', { textContent: '/*Type in a CSS selector*/' });
    this.textArea = super.renderComponent('textarea', 'editor__text-aria') as HTMLTextAreaElement;
    this.textPre = super.renderComponent('div', 'css-code') as HTMLTextAreaElement;
    this.enterBtn = super.renderComponent('button', 'enter-button', {
      textContent: 'Enter',
    });
    this.editorHTML = super.renderComponent('div', 'viewer-css');
    const viewerHeading = super.renderComponent('div', 'editor__heading');
    const spanTextHTML = super.renderComponent('span', 'editor__heading', { textContent: 'HTML viewer' });
    const numbersLinesHTML = super.renderComponent('span', 'viewer__lines-numbers');
    const htmlBox = super.renderComponent('div', 'html-box');
    this.htmlCode = super.renderComponent('pre', 'html-code');
    this.codeTag = super.renderComponent('code', 'language-html');
    parent.append(this.editor);
    this.editor.append(this.editorCss, this.editorHTML);
    this.editorCss.append(editorHeading, numbersLinesCSS, pre);
    pre.append(this.textArea, this.textPre, this.enterBtn);
    editorHeading.append(spanTextCss);

    this.editorHTML.append(viewerHeading, numbersLinesHTML, htmlBox);
    htmlBox.append(this.htmlCode);
    this.htmlCode.appendChild(this.codeTag);
    viewerHeading.append(spanTextHTML);

    this.createLinesNumbers(numbersLinesCSS, numbersLinesHTML);
    this.enterBtn.addEventListener('click', () => {
      const current = this.controller?.currentLevel;

      if (current) this.checkSelector(current, this.textArea.value);
    });
    this.textArea.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        e.preventDefault();
        const current = this.controller?.currentLevel;

        if (current) this.checkSelector(current, this.textArea.value);
      }
    });
    this.onLevelChange();
    this.onGetHint();
  }

  protected createLinesNumbers(numbersLinesC: HTMLElement, numbersLinesH: HTMLElement): void {
    const lines: number[] = Array(17)
      .fill(0)
      .map((el: number, i) => i + 1);
    lines.forEach((line) => {
      numbersLinesC.insertAdjacentHTML('beforeend', `${line}<br>`);
      numbersLinesH.insertAdjacentHTML('beforeend', `${line}<br>`);
    });
  }

  public showCode(level: ILevels): void {
    this.textArea.value = '';
    this.codeTag.innerHTML = '';
    this.textPre.innerHTML = '';
    const codeI = hljs.highlightAuto(`<div class = "table">\n${level.boardMarkup as string}\n</div>`).value;
    this.codeTag.innerHTML = codeI;
    this.textPre.innerHTML = level.help as string;
    const examples = level.examples as string[];
    if (examples)
      examples.forEach((ex) => {
        this.textPre.insertAdjacentHTML('beforeend', `\n${ex}`);
      });
  }

  public onLevelChange(): void {
    this.emitter?.subscribe('updateLevel', (level?: ILevels) => {
      if (level) this.showCode(level);
    });
  }

  protected getTextAriaContent(): string {
    return this.textArea.value;
  }

  public checkSelector(level: ILevels, answer: string): void {
    if (level.selector !== answer) {
      console.log('LLLOOOOOOSSSEEE💥');
      this.emitter?.emit('loseLevel', level);
    }
    if (level.selector === answer) {
      console.log('WWWWIIINNNNN🎊🎊🎊🎊🎊');
      this.controller?.getCompletedLevels(level);
      this.textArea.value = '';
      this.emitter?.emit('winLevel', level);
    }
  }

  public onGetHint(): void {
    this.emitter?.subscribe('hint', (level?: ILevels) => {
      if (level) this.getHint(level);
    });
  }

  public getHint(level: ILevels): void {
    const hint = level.selector;
    console.log('editor hint', hint);
    this.textArea.value = `${hint as string}`;
  }
}

export { Editor };
