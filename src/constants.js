const ListItem = {
  alignItems: "center",
  boxSizing: "border-box",
  display: "block"
};

const styles = {
  List: {
    boxSizing: "border-box",
    height: "inherit",
    margin: 0,
    overflowX: "hidden",
    overflowY: "scroll",
    padding: 0
  },
  ListHeader: {
    ...ListItem,
    height: "auto",
    margin: 0,
    position: "relative",
    width: "100%",
    zIndex: 1
  },
  ListItem,
  Wrapper: {
    height: "inherit",
    position: "relative"
  }
};

export default styles;
