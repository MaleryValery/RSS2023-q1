// interface IComponent {
//   tagComponent: string;
//   classNameList?: string;
//   attributes?: Attributes;
// newComponent: HTMLElement | null;
//   callBack?: (event: Event) => void;
// }

interface Attributes {
  [key: string]: string;
}

class ComponentCreate {
  public tagComponent: string;

  public classNameList?: string;

  public newComponent: HTMLElement;

  public attributes?: Attributes;

  public callBack?: (event: Event) => void;

  constructor(tagComponent: string, classNameList?: string, attributes?: Attributes) {
    const component = document.createElement(tagComponent);
    if (classNameList) component.className = classNameList;
    if (attributes) Object.assign(component, attributes);
    this.newComponent = component;
  }

  public appendComponent(...components: (ComponentCreate | string | Node)[]): void {
    const getComponent = (component: ComponentCreate | string | Node): Node => {
      if (component instanceof ComponentCreate) return component.newComponent;
      if (typeof component === 'string') return document.createTextNode(component);
      return component;
    };
    this.newComponent.append(...components.map((component) => getComponent(component)));
  }
}

// export class Component {
//   constructor(tag, className, props) {
//     const node = document.createElement(tag);
//     if (className) node.className = className;
//     if (props) Object.assign(node, props);
//     this.node = node;
//   }

//   append(...components) {
//     const getNode = (component) => {
//       if (typeof component === 'string') return document.createTextNode(component);
//       if (component instanceof Component) return component.node;
//       return component;
//     };
//     this.node.append(...components.map((component) => getNode(component)));
//   }
// }

// class ComponentCreate implements IComponent {
//   public tagComponent: string;

//   public classNameList: string[];

//   public content: string;

//   public parent: HTMLElement;

//   public newComponent: HTMLElement | null;

//   public callBack?: (event: Event) => void;

//   constructor(tagComponent: string, className: string[], parent: HTMLElement, content?: string) {
//     this.tagComponent = tagComponent;
//     this.classNameList = className;
//     this.parent = parent;
//     if (content) this.content = content;
//     this.newComponent = null;
//   }

//   public createComponent(): void {
//     this.newComponent = document.createElement(this.tagComponent);
//     this.setClasses(this.classNameList);
//     this.setContent(this.content);
//     if (this.callBack) this.setCallBack(this.callBack);
//   }

//   public setClasses(classNameList: string[]): void {
//     classNameList.forEach((className) => {
//       if (this.newComponent) this.newComponent.classList.add(className);
//     });
//   }

//   public setContent(content: string): void {
//     if (this.newComponent) this.newComponent.innerHTML = content;
//   }

//   public setCallBack(callBack: (event: Event) => void): void {
//     if (callBack && typeof callBack === 'function' && this.newComponent) {
//       this.newComponent.addEventListener('click', (event) => callBack(event));
//     }
//   }

//   public appendComponent(): void {
//     if (this.newComponent) this.parent.append(this.newComponent);
//     console.log('append');
//   }

// public getComponent(): HTMLElement | undefined {
//   if (this.newComponent) {
//     return this.newComponent;
//   }
//   return undefined;
// }
// }

export { ComponentCreate };
