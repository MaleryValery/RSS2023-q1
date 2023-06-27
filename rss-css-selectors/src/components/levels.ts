interface ILevels {
  [key: string]: string | string[];
}

const levels: ILevels[] = [
  {
    helpTitle: 'Select elements by their type',
    selectorName: 'Type Selector',
    doThis: 'Select the plates',
    selector: 'plate',
    syntax: 'A',
    help: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    examples: [
      '<strong>div</strong> selects all <tag>div</tag> elements.',
      '<strong>p</strong> selects all <tag>p</tag> elements.',
    ],
    boardMarkup: `
    <plate></plate>
    <plate></plate>
    `,
  },
  {
    doThis: 'Select the bento boxes',
    selector: 'bento',
    syntax: 'A',
    helpTitle: 'Select elements by their type',
    selectorName: 'Type Selector',
    help: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
    examples: [
      '<strong>div</strong> selects all <tag>div</tag> elements.',
      '<strong>p</strong> selects all <tag>p</tag> elements.',
    ],
    boardMarkup: `
    <bento></bento>
    <plate></plate>
    <bento></bento>
    `,
  },
  {
    doThis: 'Select the fancy plate',
    selector: '#fancy',
    selectorName: 'ID Selector',
    helpTitle: 'Select elements with an ID',
    syntax: '#id',
    help: 'Selects the element with a specific <strong>id</strong>. You can also combine the ID selector with the type selector.',
    examples: [
      '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
      '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
    ],
    boardMarkup: `
    <plate id="fancy"></plate>
    <plate></plate>
    <bento></bento>
    `,
  },
  {
    doThis: 'Select the small apples',
    selector: '.small',
    selectorName: 'Class Selector',
    helpTitle: 'Select elements by their class',
    syntax: '.classname',
    help: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
    examples: ['<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>'],
    boardMarkup: `
    <apple></apple>
    <apple class="small"></apple>
    <plate>
      <apple class="small"></apple>
    </plate>
    <plate></plate>
    `,
  },
  {
    doThis: 'Select the small oranges',
    selector: 'orange.small',
    helpTitle: 'Combine the Class Selector',
    syntax: 'A.className',
    help: 'You can combine the class selector with other selectors, like the type selector.',
    examples: [
      '<strong>ul.important</strong> selects all <tag>ul</tag> elements that have <strong>class="important"</strong>',
      '<strong>#big.wide</strong> selects all elements with <strong>id="big"</strong> that also have <strong>class="wide"</strong>',
    ],
    boardMarkup: `
    <apple></apple>
    <apple class="small"></apple>
    <bento>
      <orange class="small"></orange>
    </bento>
    <plate>
      <orange></orange>
    </plate>
    <plate>
      <orange class="small"></orange>
    </plate>`,
  },
  {
    doThis: 'Select the small oranges in the bentos',
    selector: 'bento orange.small',
    syntax: 'Put your back into it!',
    helpTitle: 'You can do it...',
    help: 'Combine what you learned in the last few levels to solve this one!',
    boardMarkup: `
    <bento>
      <orange></orange>
    </bento>
    <orange class="small"></orange>
    <bento>
      <orange class="small"></orange>
    </bento>
    <bento>
      <apple class="small"></apple>
    </bento>
    <bento>
      <orange class="small"></orange>
    </bento>
    `,
  },
  {
    doThis: 'Select all the plates and bentos',
    selector: 'plate,bento',
    selectorName: 'Comma Combinator',
    helpTitle: 'Combine, selectors, with... commas!',
    syntax: 'A, B',
    help: 'Thanks to Shatner technology, this selects all <strong>A</strong> and <strong>B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
    examples: [
      '<strong>p, .fun</strong> selects all <tag>p</tag> elements as well as all elements with <strong>class="fun"</strong>',
      '<strong>a, p, div</strong> selects all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements',
    ],
    boardMarkup: `
    <pickle></pickle>
    <plate>
      <pickle></pickle>
    </plate>
    <bento>
      <pickle></pickle>
    </bento>
    <plate>
      <pickle></pickle>
    </plate>
    <pickle></pickle>
    `,
  },
  {
    doThis: 'Select all the things!',
    selector: '*',
    selectorName: 'The Universal Selector',
    helpTitle: 'You can select everything!',
    syntax: '*',
    help: 'You can select all elements with the universal selector! ',
    examples: ['<strong>p *</strong> selects any element inside all <tag>p</tag> elements.'],
    boardMarkup: `
    <apple></apple>
    <plate>
      <orange class="small"></orange>
    </plate>
    <bento></bento>
    <bento>
      <orange></orange>
    </bento>
    `,
  },
  {
    selectorName: 'First Child Pseudo-selector',
    helpTitle: 'Select a first child element inside of another element',
    doThis: 'Select the top orange',
    selector: 'plate :first-child',
    syntax: ':first-child',

    help: 'You can select the first child element. A child element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.',
    examples: [
      '<strong>:first-child</strong> selects all first child elements.',
      '<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.',
      '<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>.',
    ],
    boardMarkup: `
    <bento></bento>
    <plate></plate>
    <plate>
      <orange></orange>
      <orange></orange>
      <orange></orange>
    </plate>
    <pickle class="small"></pickle>`,
  },
  {
    selectorName: 'General Sibling Selector',
    helpTitle: 'Select elements that follows another element',
    syntax: 'A ~ B',
    doThis: 'Select the pickles beside the bento',
    selector: 'bento ~ pickle',
    help: 'You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.',
    examples: ['<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>'],
    boardMarkup: `
    <pickle></pickle>
    <bento>
      <orange class="small"></orange>
    </bento>
    <pickle class="small"></pickle>
    <pickle></pickle>
    <plate>
      <pickle></pickle>
    </plate>
    <plate>
      <pickle class="small"></pickle>
    </plate>
    `,
  },
  {
    selectorName: 'Nth of Type Selector',
    doThis: 'Select all even plates',
    selector: 'plate:nth-of-type(even)',
    syntax: ':nth-of-type(A)',
    help: 'Selects a specific element based on its type and order in another element - or even or odd instances of that element.',
    examples: [
      '<strong>div:nth-of-type(2)</strong> selects the second instance of a div.',
      '<strong>.example:nth-of-type(odd)</strong> selects all odd instances of a the example class.',
    ],
    boardMarkup: `
    <plate></plate>
    <plate></plate>
    <plate></plate>
    <plate></plate>
    `,
  },
  {
    selectorName: 'Only of Type Selector',
    helpTitle: 'Select elements that are the only ones of their type within of their parent element',
    selector: 'apple:only-of-type',
    syntax: ':only-of-type',
    doThis: 'Select the apple on the middle plate',
    help: 'Selects the only element of its type within another element.',
    examples: [
      '<strong>p span:only-of-type</strong> selects a <tag>span</tag> within any <tag>p</tag> if it is the only <tag>span</tag> in there.',
    ],
    boardMarkup: `
    <plate id="fancy">
      <apple class="small"></apple>
      <apple></apple>
    </plate>
    <plate>
      <apple class="small"></apple>
    </plate>
    <plate>
      <pickle></pickle>
    </plate>
    `,
  },
  {
    selectorName: 'Empty Selector',
    helpTitle: "Select elements that don't have children",
    doThis: 'Select the empty bentos',
    selector: 'bento:empty',
    syntax: ':empty',
    help: "Selects elements that don't have any other elements inside of them.",
    examples: ['<strong>div:empty</strong> selects all empty <tag>div</tag> elements.'],
    boardMarkup: `
    <bento></bento>
    <bento>
      <pickle class="small"></pickle>
    </bento>
    <plate></plate>
    <bento></bento>`,
  },
];

export { levels, ILevels };
