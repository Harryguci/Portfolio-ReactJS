import "../Assets/Styles/SCSS/Thumbnail.scss";

export default function Thumbnail(props) {
  const url = props.url;

  let type;
  if (props.type) type = props.type;
  else type = "right";

  return (
    <div className="thumbnail mx-md-2 my-auto" style={{ left: "auto", right: 0 }}>
      <div
        className="image-container overflow-hidden rounded-3 d-block"
      >
        <div className={`${type}-behind-border`}></div>
        <img src={url} alt="harryguci" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}
