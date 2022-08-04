import "./Track.css";

export default function Track({ track, onAdd, onRemove, isRemoval }) {
  const { name, artist, album } = track;

  const addTrack = () => {
    onAdd(track);
  };

  const removeTrack = () => {
    onRemove(track);
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>
          {artist} | {album}
        </p>
      </div>
      <button
        className="Track-action"
        onClick={isRemoval ? removeTrack : addTrack}
      >
        {isRemoval ? "-" : "+"}
      </button>
    </div>
  );
}
