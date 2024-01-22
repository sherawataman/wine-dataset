import React from 'react';
import '../StatisticsTable.css'

interface Statistics {
  measure: string;
  mean: number[];
  median: number[];
  mode: (number[] | number)[];
}

interface Props {
  statistics: Statistics;
  measure: string;
}

const ClassStatisticsTable: React.FC<Props> = ({ statistics, measure }) => {
    const formatValue = (value: number | number[], precision: number = 3): string => {
        if (Array.isArray(value)) {
          return value.map(v => v.toFixed(precision)).join(', ');
        }
        return value.toFixed(precision);
      };
  return (
    <div className="table-container">
      <h3>{measure} Statistics</h3>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            <th>Class 1</th>
            <th>Class 2</th>
            <th>Class 3</th>
            <th>Class 4</th>
            <th>Class 5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{statistics.measure} Mean</td>
            {statistics.mean.map((mean, index) => (
              <td key={index}>{mean.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>{statistics.measure} Median</td>
            {statistics.median.map((median, index) => (
              <td key={index}>{median.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>{statistics.measure} Mode</td>
            {statistics.mode.map((mode, index) => (
              <td key={index}>{formatValue(mode)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClassStatisticsTable;
