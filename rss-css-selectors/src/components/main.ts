import { ComponentCreate } from './ComponentCreate';

class Main extends ComponentCreate {
  constructor() {
    super('main', 'main');

    const contentBox = new ComponentCreate('div', 'content-box');
    const subHeading = new ComponentCreate('h2', 'sub-heading', { textContent: 'Name of level' });
    // const hint = new ComponentCreate('a', 'main-hint', { textContent: 'Hint button' });

    this.appendComponent(contentBox);
    contentBox.appendComponent(subHeading);
  }

  // public showHint(id) {}
}
// function createMain(): void {
//   const gameField = document.querySelector('.game-field__wrapper');
//   const main = document.createElement('main');
//   main.classList.add('main');
//   gameField?.append(main);
//   main.insertAdjacentHTML(
//     'beforeend',
//     ` <div class="content-box">
//         <h2 class="sub-heading">Name of level</h2>
//         <p>Hint button</p>
//       </div>
//       <div class="table-wrapper">
//         <div class="table-box">
//           <div class="table"></div>
//           <div class="table-top"></div>
//         </div>
//         <div class="table-bottom">
//           <div class="table-leg"></div>
//           <div class="table-leg"></div>
//         </div>
//      </div>
//       <section class = "editor__wrapper">
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
// }

export { Main };
