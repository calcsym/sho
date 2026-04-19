export default function ProfileActions() {
  return (
    <section className="actionsRow">
      <button className="actionBtn">Edit profile</button>
      <button className="actionBtn">Share profile</button>
      <button className="iconBtn" aria-label="Add person">
        <span className="iconPlus">+</span>
      </button>
    </section>
  );
}
