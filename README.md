# react-scrollable-accordion

A basic HTML list, that allows you to define sticky list items, called headers, like this:

![React Scrollable Accordion](https://media.giphy.com/media/cNNwh9yFDzhZhceNEY/giphy.gif)

## Install

```bash
npm install react-scrollable-accordion
```

## Usage

A basic list, which is almost no different from standard HTML list, although it has no visible bullet points:

```jsx
import { List, ListHeader, ListItem } from "../src";

<List>
  <ListHeader key={0}>Header 1</ListHeader>
  <ListItem key={1}>Item 1</ListItem>
  <ListItem key={2}>Item 2</ListItem>
  <ListHeader key={3}>Header 2</ListHeader>
  <ListItem key={4}>Item 3</ListItem>
  <ListItem key={5}>Item 4</ListItem>
</List>;
```

To convert it to accordion, pass **stickyHeaders** property to the _List_ element:

```jsx
import { List, ListHeader, ListItem } from "../src";

<List stickyHeaders>
  <ListHeader key={0}>Header 1</ListHeader>
  <ListItem key={1}>Item 1</ListItem>
  <ListItem key={2}>Item 2</ListItem>
  <ListHeader key={3}>Header 2</ListHeader>
  <ListItem key={4}>Item 3</ListItem>
  <ListItem key={5}>Item 4</ListItem>
</List>;
```

You can customize the layout by passing a string to use a DOM element via _component_ property as we all as providing _CSS_ class with _className_ property:

```jsx
import { List, ListHeader, ListItem } from "../src";

<List component="div" className="accordion" stickyHeaders>
  <ListHeader component="div" className="list-header" key={0}>
    Header 1
  </ListHeader>
  <ListItem component="div" className="list-item" key={1}>
    Item 1
  </ListItem>
  <ListItem component="div" className="list-item" key={2}>
    Item 2
  </ListItem>
  <ListHeader component="div" className="list-header" key={3}>
    Header 2
  </ListHeader>
  <ListItem component="div" className="list-item" key={4}>
    Item 3
  </ListItem>
  <ListItem component="div" className="list-item" key={5}>
    Item 4
  </ListItem>
</List>;
```

You may also customize a **scroll-behavior** CSS property by passing _scrollBehavior_ property to the _List_ component with either _auto_ (default) or _smooth_ values:

```jsx
import { List, ListHeader, ListItem } from "../src";

<List stickyHeaders scrollBehavior="smooth">
  <ListHeader key={0}>Header 1</ListHeader>
  <ListItem key={1}>Item 1</ListItem>
  <ListItem key={2}>Item 2</ListItem>
  <ListHeader key={3}>Header 2</ListHeader>
  <ListItem key={4}>Item 3</ListItem>
  <ListItem key={5}>Item 4</ListItem>
</List>;
```

Read more about [scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) property.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
