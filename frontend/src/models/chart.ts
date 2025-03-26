
  interface PriceData {
    [0]: number; // Date
    [1]: number; // Open
    [2]: number; // High
    [3]: number; // Low
    [4]: number; // Close
  }

  interface VolumeData {
    [0]: number; // Date
    [1]: number; // Volume
  }


export interface ChartDataProps {
    priceList: PriceData[];
    volumeList: VolumeData[];
  }
  
