import './sources.css';
import { Sourse } from '../../app/types';
import { DrawInterface } from '../../app/interface';

class Sources implements DrawInterface {
  public draw = (data: Sourse[]): void => {
    const fragmentLg: DocumentFragment = document.createDocumentFragment();
    const sourceLgTemp: HTMLTemplateElement | null = document.querySelector('#sourceLgTemp');
    const sourceLgConteiner: HTMLElement | null = document.querySelector('.sources-lg');
    const lgList = data.map((item) => item.language).filter((item, i, arr) => arr.indexOf(item) === i);
    let activeLg: string | null = 'en';
    let filterData: Sourse[] = data;

    this.drawSourcesBtm(filterData);

    lgList.forEach((item) => {
      const sourceLgClone = sourceLgTemp?.content.cloneNode(true) as DocumentFragment;
      if (sourceLgClone) {
        const sourceLgName: HTMLElement | null = sourceLgClone.querySelector('.sources-lg-name');
        const sourceLgItem: HTMLElement | null = sourceLgClone.querySelector('.sources-lg-item');
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
          this.drawSourcesBtm(filterData);
        });
      }
      fragmentLg.append(sourceLgClone);
    });
    sourceLgConteiner?.append(fragmentLg);
  };

  private drawSourcesBtm(filtredData: Sourse[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
    const sourceConteiner: HTMLElement | null = document.querySelector('.sources');
    filtredData.forEach((item) => {
      const sourceClone = sourceItemTemp?.content.cloneNode(true) as DocumentFragment;
      if (sourceClone) {
        const sourceName: HTMLElement | null = sourceClone.querySelector('.source__item-name');
        const sourceItem: HTMLElement | null = sourceClone.querySelector('.source__item');
        if (sourceName) sourceName.textContent = item.name;
        if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);
      }
      fragment.append(sourceClone);
    });
    if (sourceConteiner) sourceConteiner.innerHTML = '';
    sourceConteiner?.append(fragment);
  }
}

export default Sources;
