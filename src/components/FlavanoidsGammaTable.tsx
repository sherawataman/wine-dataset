import React from 'react';
import ClassStatisticsTable from './ClassStatisticsTable';
import { DataItem, calculateClassStatistics, calculateGammaStatistics } from './utility/utility';

interface Props {
  data: DataItem[];
}
const FlavanoidsGammaTable: React.FC<Props> = ({ data }) => {
    const flavanoidsStatistics = calculateClassStatistics(data, 'Flavanoids');
    const gammaStatistics = calculateGammaStatistics(data);
  
    return (
      <div>
        <ClassStatisticsTable statistics={flavanoidsStatistics} measure="Flavanoids" />
        <ClassStatisticsTable statistics={gammaStatistics} measure="Gamma" />
      </div>
    );
  };
  
  export default FlavanoidsGammaTable;