export default function PrintModelCardButton() {
  return (
    <button className="actionBtn" onClick={() => window.print()} type="button">
      Print Model Card
    </button>
  );
}
