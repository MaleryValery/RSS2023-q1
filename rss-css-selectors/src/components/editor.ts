import { ILevels } from './utils/interface';
import { View } from './view';
// import { levels } from './levels';

class Editor extends View {
  public editor: HTMLElement;

  public editorCss: HTMLElement;

  public editorHTML: HTMLElement;

  public textArea: HTMLTextAreaElement;

  public htmlCode: HTMLElement;

  public enterBtn: HTMLElement;

  public render(parent: HTMLElement): void {
    this.editor = super.renderComponent('section', 'editor__wrapper');

    this.editorCss = super.renderComponent('div', 'editor-css');
    const editorHeading = super.renderComponent('div', 'editor__heading');
    const spanTextCss = super.renderComponent('span', 'editor__heading', { textContent: 'CSS Editor' });
    const numbersLinesCSS = super.renderComponent('span', 'editor__lines-numbers');
    const pre = super.renderComponent('pre', 'code', { textContent: '/*Type in a CSS selector*/' });
    this.textArea = super.renderComponent('textarea', 'editor__text-aria') as HTMLTextAreaElement;
    this.enterBtn = super.renderComponent('button', 'enter-button', {
      textContent: 'Enter',
    });
    this.editorHTML = super.renderComponent('div', 'viewer-css');
    const viewerHeading = super.renderComponent('div', 'editor__heading');
    const spanTextHTML = super.renderComponent('span', 'editor__heading', { textContent: 'HTML viewer' });
    const numbersLinesHTML = super.renderComponent('span', 'viewer__lines-numbers');
    const htmlBox = super.renderComponent('div', 'html-box');
    this.htmlCode = super.renderComponent('pre', 'html-code');
    parent.append(this.editor);
    this.editor.append(this.editorCss, this.editorHTML);
    this.editorCss.append(editorHeading, numbersLinesCSS, pre, this.textArea, this.enterBtn);
    editorHeading.append(spanTextCss);

    this.editorHTML.append(viewerHeading, numbersLinesHTML, htmlBox);
    htmlBox.append(this.htmlCode);
    viewerHeading.append(spanTextHTML);

    this.createLinesNumbers(numbersLinesCSS, numbersLinesHTML);
    this.enterBtn.addEventListener('click', () => {
      this.checkSelector(this.controller.currentLevel, this.textArea.value);
    });
    this.textArea.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') {
        e.preventDefault();
        this.checkSelector(this.controller.currentLevel, this.textArea.value);
      }
    });
    this.onLevelChange();
  }

  protected createLinesNumbers(numbersLinesC: HTMLElement, numbersLinesH: HTMLElement): void {
    const lines: number[] = Array(20)
      .fill(0)
      .map((el: number, i) => i + 1);
    lines.forEach((line) => {
      numbersLinesC.insertAdjacentHTML('beforeend', `${line}<br>`);
      numbersLinesH.insertAdjacentHTML('beforeend', `${line}<br>`);
    });
  }

  public showCode(level: ILevels): void {
    this.textArea.innerHTML = '';
    this.htmlCode.innerHTML = '';
    this.htmlCode.insertAdjacentText('afterbegin', `<div class = "table">\n${level.boardMarkup as string}\n</div>`);
  }

  public onLevelChange(): void {
    this.emitter.subscribe('updateLevel', (level: ILevels) => this.showCode(level));
  }

  protected getTextAriaContent(): string {
    console.log('textaria', this.textArea.value);
    return this.textArea.value;
  }

  public checkSelector(level: ILevels, answer: string): void {
    console.log('check', level);
    console.log('check answer', answer);
    if (level.selector !== answer) {
      console.log('LLLOOOOOOSSSEEE💥');
      this.emitter.emit('loseLevel', level);
    }
    if (level.selector === answer) {
      console.log('WWWWIIINNNNN🎊🎊🎊🎊🎊');
      this.controller.getCompletedLevels(level);
      this.textArea.value = '';
      this.emitter.emit('winLevel', level);
    }
  }
}

export { Editor };
