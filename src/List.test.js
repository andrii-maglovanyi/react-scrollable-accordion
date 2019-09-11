import React from "react";

import { cleanup, render, wait } from "@testing-library/react";
import "@testing-library/jest-dom";

import List from "./List";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";

// Window height is 100px
window.innerHeight = 200;

// List item (li) height is 50px
const itemHeight = 50;

const listItems = [
  <ListHeader key={0}>Header 1</ListHeader>,
  <ListItem key={1}>Item 1</ListItem>,
  <ListItem key={2}>Item 2</ListItem>,
  <ListHeader key={3}>Header 2</ListHeader>,
  <ListItem key={4}>Item 3</ListItem>,
  <ListItem key={5}>Item 4</ListItem>,
  <ListHeader key={6}>Header 3</ListHeader>,
  <ListItem key={7}>Item 5</ListItem>,
  <ListItem key={8}>Item 6</ListItem>
];

const getChildIndex = element =>
  [].findIndex.call(element.parentNode.children, child => child === element);

Element.prototype.getBoundingClientRect = function getBoundingClientRect() {
  return {
    height: itemHeight
  };
};

Object.defineProperties(window.HTMLElement.prototype, {
  offsetHeight: {
    get() {
      return parseFloat(window.getComputedStyle(this).height) || 0;
    }
  },
  offsetTop: {
    get() {
      return getChildIndex(this) * itemHeight;
    }
  }
});

afterEach(cleanup);

test("should render a regular List", async () => {
  const { getByText } = render(<List>{listItems}</List>);

  await wait(() => {
    const firstHeaderNode = getByText("Header 1");
    expect(firstHeaderNode.parentElement.tagName).toBe("UL");
    expect(firstHeaderNode.classList.length).toBe(1);
    expect(firstHeaderNode.classList[0]).toBe("ListHeader");

    const middleHeaderNode = getByText("Header 2");
    expect(middleHeaderNode.classList.length).toBe(1);
    expect(middleHeaderNode.classList[0]).toBe("ListHeader");

    const lastHeaderNode = getByText("Header 3");
    expect(lastHeaderNode.classList.length).toBe(1);
    expect(lastHeaderNode.classList[0]).toBe("ListHeader");
  });
});

test("should render List with Header 1 on top, scrollable Header 2, Header 3 on bottom", async () => {
  const { getByText, getByTestId } = render(
    <List style={{ height: "200px" }} data-testid="list" stickyHeaders>
      {listItems}
    </List>
  );
  getByTestId("list").scrollTop = 75;

  await wait(() => {
    const firstHeaderNode = getByText("Header 1");
    expect(firstHeaderNode.classList.length).toBe(2);
    expect(firstHeaderNode.classList[0]).toBe("ListHeader");
    expect(firstHeaderNode.classList[1]).toBe("sticky");
    expect(firstHeaderNode.style.top).toBe("0px");

    const middleHeaderNode = getByText("Header 2");
    expect(middleHeaderNode.classList.length).toBe(1);
    expect(middleHeaderNode.classList[0]).toBe("ListHeader");
    expect(middleHeaderNode.style.bottom).toBe("");
    expect(middleHeaderNode.style.top).toBe("");

    const lastHeaderNode = getByText("Header 3");
    expect(lastHeaderNode.classList.length).toBe(2);
    expect(lastHeaderNode.classList[0]).toBe("ListHeader");
    expect(lastHeaderNode.classList[1]).toBe("sticky");
    expect(lastHeaderNode.style.bottom).toBe("0px");
  });
});

test("should render List with Header 1 and Header 2 on top, Header 3 on bottom", async () => {
  const { getByText, getByTestId } = render(
    <List data-testid="list" stickyHeaders>
      {listItems}
    </List>
  );
  getByTestId("list").scrollTop = 100;

  await wait(() => {
    const firstHeaderNode = getByText("Header 1");
    expect(firstHeaderNode.classList.length).toBe(2);
    expect(firstHeaderNode.classList[0]).toBe("ListHeader");
    expect(firstHeaderNode.classList[1]).toBe("sticky");
    expect(firstHeaderNode.style.top).toBe("0px");

    const middleHeaderNode = getByText("Header 2");
    expect(middleHeaderNode.classList.length).toBe(2);
    expect(middleHeaderNode.classList[0]).toBe("ListHeader");
    expect(middleHeaderNode.classList[1]).toBe("sticky");
    expect(middleHeaderNode.style.top).toBe("50px");

    const lastHeaderNode = getByText("Header 3");
    expect(lastHeaderNode.classList.length).toBe(2);
    expect(lastHeaderNode.classList[0]).toBe("ListHeader");
    expect(lastHeaderNode.classList[1]).toBe("sticky");
    expect(lastHeaderNode.style.bottom).toBe("0px");
  });
});

test("should render List with Header 1, Header 2 and Header 3 on top", async () => {
  const { getByText, getByTestId } = render(
    <List data-testid="list" stickyHeaders>
      {listItems}
    </List>
  );

  getByTestId("list").scrollTop = 200;

  await wait(() => {
    const firstHeaderNode = getByText("Header 1");
    expect(firstHeaderNode.classList.length).toBe(2);
    expect(firstHeaderNode.classList[0]).toBe("ListHeader");
    expect(firstHeaderNode.classList[1]).toBe("sticky");
    expect(firstHeaderNode.style.top).toBe("0px");

    const middleHeaderNode = getByText("Header 2");
    expect(middleHeaderNode.classList.length).toBe(2);
    expect(middleHeaderNode.classList[0]).toBe("ListHeader");
    expect(middleHeaderNode.classList[1]).toBe("sticky");
    expect(middleHeaderNode.style.top).toBe("50px");

    const lastHeaderNode = getByText("Header 3");
    expect(lastHeaderNode.classList.length).toBe(2);
    expect(lastHeaderNode.classList[0]).toBe("ListHeader");
    expect(lastHeaderNode.classList[1]).toBe("sticky");
    expect(lastHeaderNode.style.top).toBe("100px");
  });
});

test("should render List with DIV wrapper element", () => {
  const { getByText } = render(
    <List className="test-classname" component="div" stickyHeaders>
      {listItems}
    </List>
  );

  const firstHeaderNode = getByText("Header 1");
  const listNode = firstHeaderNode.parentElement;
  expect(listNode.tagName).toBe("DIV");
  expect(listNode.classList.length).toBe(2);
  expect(listNode.classList[0]).toBe("List");
  expect(listNode.classList[1]).toBe("test-classname");
});
