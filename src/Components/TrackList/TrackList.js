import "./TrackList.css";
import Track from "../Track/Track";

export default function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
  const tracksJsx = tracks.map((track) => (
    <Track
      key={track.id}
      track={track}
      onAdd={onAdd}
      onRemove={onRemove}
      isRemoval={isRemoval}
    />
  ));

  return <div className="TrackList">{tracksJsx}</div>;
}
