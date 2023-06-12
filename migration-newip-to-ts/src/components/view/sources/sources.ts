import './sources.css';
import { Sourses, HTMLEl } from '../../app/types';
import { SourcesDrawInterface } from '../../app/interface';

class Sources implements SourcesDrawInterface {
  public draw = (data: Sourses[]): void => {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const fragmentLg: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
    const sourceConteiner: HTMLEl = document.querySelector('.sources');
    const sourceLgTemp: HTMLTemplateElement | null = document.querySelector('#sourceLgTemp');
    const sourceLgConteiner: HTMLEl = document.querySelector('.sources-lg');
    const lgList = data.map((item) => item.language).filter((item, i, arr) => arr.indexOf(item) === i);
    let activeLg: string | null = 'en';
    let filterData: Sourses[] = data;

    function drawSourcesBtm(filtredData: Sourses[]): void {
      filtredData.forEach((item) => {
        const sourceClone = sourceItemTemp?.content.cloneNode(true) as DocumentFragment;
        if (sourceClone) {
          const sourceName: HTMLEl = sourceClone.querySelector('.source__item-name');
          const sourceItem: HTMLEl = sourceClone.querySelector('.source__item');
          if (sourceName) sourceName.textContent = item.name;
          if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);
        }

        fragment.append(sourceClone);
      });
      if (sourceConteiner) sourceConteiner.innerHTML = '';
      sourceConteiner?.append(fragment);
    }
    drawSourcesBtm(filterData);

    lgList.forEach((item) => {
      const sourceLgClone = sourceLgTemp?.content.cloneNode(true) as DocumentFragment;
      if (sourceLgClone) {
        const sourceLgName: HTMLEl = sourceLgClone.querySelector('.sources-lg-name');
        const sourceLgItem: HTMLEl = sourceLgClone.querySelector('.sources-lg-item');
        if (sourceLgName) sourceLgName.textContent = item;
        if (sourceLgItem) sourceLgItem.setAttribute('data-source-lg', item);
        sourceLgItem?.addEventListener('click', () => {
          const sourceLgItems = [...document.querySelectorAll('.sources-lg-item')];
          sourceLgItems.forEach((actbtn) => {
            if (actbtn.classList.contains('sources-lg-active')) actbtn.classList.remove('sources-lg-active');
          });
          sourceLgItem.classList.toggle('sources-lg-active');
          activeLg = sourceLgItem.classList.contains('sources-lg-active')
            ? sourceLgItem.getAttribute('data-source-lg')
            : '';
          filterData =
            data.filter((source) => source.language === activeLg).length > 0
              ? data.filter((source) => source.language === activeLg)
              : data;
          drawSourcesBtm(filterData);
        });
      }
      fragmentLg.append(sourceLgClone);
    });

    sourceLgConteiner?.append(fragmentLg);
  };
}

export default Sources;
