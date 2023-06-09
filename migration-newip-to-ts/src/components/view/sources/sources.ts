import './sources.css';
import { Sourses } from '../../app/types';

class Sources {
  public draw = (data: Sourses[]): void => {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
    const sourceBlock: Element | null = document.querySelector('.sources') as HTMLElement;

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

      const sourceName = sourceClone.querySelector('.source__item-name') as HTMLElement;
      sourceName.textContent = item.name;
      const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
      sourceItem.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    sourceBlock.append(fragment);
  };
}

export default Sources;
