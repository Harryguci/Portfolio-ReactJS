function Button(props) {
  let type = "button";
  if (props.href) {
    type = "link";
  }
  console.log(props);
  type = type === "button" ? "button" : "a";
  if (type === "button") return <button {...props}>{props.children}</button>;
  else return <a {...props}>{props.children}</a>;
}

export default Button;
