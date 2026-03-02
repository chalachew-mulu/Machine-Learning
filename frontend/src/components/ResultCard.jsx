export default function ResultCard({ result }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Prediction Result:</h3>
      <p>{result}</p>
    </div>
  );
}