export interface DataItem {
    "Alcohol": number;
    "Malic Acid": number;
    "Ash": number;
    "Alcalinity of ash": number;
    "Magnesium": number;
    "Total phenols": number;
    "Flavanoids": number;
    "Nonflavanoid phenols": number;
    "Proanthocyanins": string;
    "Color intensity": number;
    "Hue": number;
    "OD280/OD315 of diluted wines": number;
    "Unknown"?: number;
    "Gamma"?: number; // New property
  }
  
  interface Statistics {
    measure: string;
    mean: number[];
    median: number[];
    mode: (number[] | number)[];
  }
  
  export const calculateClassStatistics = (data: DataItem[], property: string): Statistics => {
    const groupedData: Record<number, number[]> = {};
  
    data.forEach((item) => {
      const alcoholClass = item.Alcohol;
      if (!groupedData[alcoholClass]) {
        groupedData[alcoholClass] = [];
      }
      // @ts-ignore
      groupedData[alcoholClass].push(item[property]);
    });
  
    const statistics: Statistics = {
      measure: property,
      mean: [],
      median: [],
      mode: []
    };
  
    Object.keys(groupedData).forEach((alcoholClass) => {
      const propertyValues = groupedData[parseInt(alcoholClass, 10)];
  
      const mean = propertyValues.reduce((sum, value) => sum + value, 0) / propertyValues.length;
      statistics.mean.push(mean);
  
      const sortedValues = [...propertyValues].sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedValues.length / 2);
      const median = sortedValues.length % 2 === 0
        ? (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2
        : sortedValues[middleIndex];
      statistics.median.push(median);
  
    const frequencyMap: Record<number, number> = {};
    let maxFrequency = 0;
    let mode: number | null = null;

    propertyValues.forEach((value) => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;

      if (frequencyMap[value] > maxFrequency) {
        maxFrequency = frequencyMap[value];
        mode = value;
      }
    });

    statistics.mode.push(mode !== null ? mode : 0);
    });
  
    return statistics;
  };
  
  const calculateGamma = (data: DataItem): number => {
    return (data.Ash * data.Hue) / data.Magnesium;
  };
  
  export const calculateGammaStatistics = (data: DataItem[]): Statistics => {
    data.forEach((item) => {
      item.Gamma = calculateGamma(item);
    });
  
    const groupedData: Record<number, number[]> = {};
  
    data.forEach((item) => {
      const alcoholClass = item.Alcohol;
      if (!groupedData[alcoholClass]) {
        groupedData[alcoholClass] = [];
      }
      groupedData[alcoholClass].push(item.Gamma!); 
    });
  
    const statistics: Statistics = {
      measure: 'Gamma',
      mean: [],
      median: [],
      mode: []
    };
  
    Object.keys(groupedData).forEach((alcoholClass) => {
      const gammaValues = groupedData[parseInt(alcoholClass, 10)];
  
      const mean = gammaValues.reduce((sum, value) => sum + value, 0) / gammaValues.length;
      statistics.mean.push(mean);
  
      const sortedValues = [...gammaValues].sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedValues.length / 2);
      const median = sortedValues.length % 2 === 0
        ? (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2
        : sortedValues[middleIndex];
      statistics.median.push(median);
  
    const frequencyMap: Record<number, number> = {};
    let maxFrequency = 0;
    let mode: number | null = null;

    gammaValues.forEach((value) => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;

      if (frequencyMap[value] > maxFrequency) {
        maxFrequency = frequencyMap[value];
        mode = value;
      }
    });

    statistics.mode.push(mode !== null ? mode : 0);
    });
  
    return statistics;
  };