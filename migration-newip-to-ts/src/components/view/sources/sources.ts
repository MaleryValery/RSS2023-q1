import './sources.css';
import { Sourses, HTMLEl } from '../../app/types';

class Sources {
  public draw = (data: Sourses[]): void => {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
    const sourceBlock: HTMLEl = document.querySelector('.sources');

    data.forEach((item) => {
      const sourceClone = sourceItemTemp?.content.cloneNode(true) as DocumentFragment;
      if (sourceClone) {
        const sourceName: HTMLEl = sourceClone.querySelector('.source__item-name');
        const sourceItem: HTMLEl = sourceClone.querySelector('.source__item');
        if (sourceName) sourceName.textContent = item.name;
        if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);
      }

      fragment.append(sourceClone);
    });

    sourceBlock?.append(fragment);
  };
}

export default Sources;
