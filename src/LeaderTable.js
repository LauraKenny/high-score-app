export default function LeaderTable({ leaders }) {
  return (
    <table className="table is-striped">
      <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>Score</th>
          <th>Number of clicks</th>
          <th>Avg points per click</th>
        </tr>
        {leaders.map((item, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.totalPoints}</td>
              <td>{item.clicks}</td>
              <td>{Math.round(item.totalPoints / item.clicks)}</td>
            </tr>
          );
        })}
      </thead>
    </table>
  );
}
