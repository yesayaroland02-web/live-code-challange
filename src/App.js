
import { useEffect, useState } from "react";

export default function App() {
  const [strings, setStrings] = useState([]);
  const [letterCounts, setLetterCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStrings() {
      try {
        const response = await fetch(
          "https://www.random.org/strings/?num=10&len=32&upperalpha=on&unique=off&format=plain"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.text();

        // Convert response into an array
        const stringArray = data.trim().split("\n");

        setStrings(stringArray);

        // Count each alphabet
        const counts = {};

        for (let i = 65; i <= 90; i++) {
          counts[String.fromCharCode(i)] = 0;
        }

        stringArray.forEach((str) => {
          for (const letter of str) {
            counts[letter]++;
          }
        });

        setLetterCounts(counts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStrings();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Random String Letter Counter</h1>

      <h2>Random Strings</h2>

      {strings.map((str, index) => (
        <div key={index}>
          {index + 1}. {str}
        </div>
      ))}

      <h2>Letter Count</h2>

      <table
        style={{
          borderCollapse: "collapse",
          width: "300px",
        }}
      >
        <thead>
          <tr>
            <th>Alphabet</th>
            <th>Count</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(letterCounts).map(
            ([letter, count], index) => (
              <tr
                key={letter}
                style={{
                  backgroundColor:
                    (index + 1) % 2 === 0 ? "red" : "white",
                  color:
                    (index + 1) % 2 === 0 ? "white" : "black",
                }}
              >
                <td style={{ padding: "8px", border: "1px solid gray" }}>
                  {letter}
                </td>

                <td style={{ padding: "8px", border: "1px solid gray" }}>
                  {count}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
