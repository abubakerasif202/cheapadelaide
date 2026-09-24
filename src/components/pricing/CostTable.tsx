export interface CostTableProps {
  headers: string[];
  rows: React.ReactNode[][];
  caption?: string;
  emphasisCol?: number;
}

export function CostTable({ headers = [], rows = [], caption, emphasisCol = -1 }: CostTableProps) {
  return (
    <figure className="ca-table-wrap" style={{ margin: 0 }}>
      <div className="ca-table-scroll">
        <table className="ca-table">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className={j === (emphasisCol < 0 ? row.length - 1 : emphasisCol) ? "ca-table__em" : undefined}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? <figcaption className="ca-table__caption">{caption}</figcaption> : null}
    </figure>
  );
}
