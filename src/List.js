import PropTypes from "prop-types";
import React, { useRef } from "react";

import ListHeader from "./ListHeader";
import styles from "./List.module.css";

const List = ({
  children,
  className,
  component: Component,
  scrollBehavior,
  stickyHeaders,
  ...other
}) => {
  const listRef = useRef();
  let index = 0;
  const headers = [];

  const getStickedHeadersTotalHeight = (start, end, align) =>
    headers.slice(start, end).reduce((acc, header) => {
      if (align) {
        return (
          acc +
          (header.current.style.top
            ? 0
            : header.current.getBoundingClientRect().height)
        );
      }
      return acc + header.current.getBoundingClientRect().height;
    }, 0);

  const addHeader = ref => headers.push(ref);

  const getTotalHeaders = () => headers.length;

  const nodes = stickyHeaders
    ? React.Children.map(children, child => {
        if (child && child.type === ListHeader) {
          const header = React.cloneElement(child, {
            addHeader,
            getStickedHeadersTotalHeight,
            getTotalHeaders,
            listRef,
            index
          });

          index += 1;

          return header;
        }
        return child;
      })
    : children;

  return (
    <div className={styles.Wrapper}>
      <Component
        className={[styles.List, className].join(" ").trim()}
        ref={listRef}
        style={{ scrollBehavior }}
        {...other}
      >
        {nodes}
      </Component>
    </div>
  );
};

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string,
  scrollBehavior: PropTypes.oneOf(["auto", "smooth"]),
  stickyHeaders: PropTypes.bool
};

List.defaultProps = {
  children: [],
  className: "",
  component: "ul",
  scrollBehavior: "auto",
  stickyHeaders: false
};

export default List;
