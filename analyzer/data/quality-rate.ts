export interface QltyRateOption {
  label: string
  val: number
  chip?: { color: string }
}

export const qltyRateSetlect: QltyRateOption[] = [
  { label: 'deep', val: 2, chip: { color: 'success' } },
  { label: 'neutral', val: 1, chip: { color: 'neutral' } },
  { label: 'shallow', val: 0, chip: { color: 'warning' } },
]

// type QualityRating = 'deep' | 'neutral' | 'shallow' | 'high' | 'medium' | 'low' | 'productive' | 'unproductive';
// interface TimeLog {
//   id?: string;
//   activity: string;
//   timestamp: string;
//   durationMinutes: number;
//   qualityRating?: QualityRating;
//   // inne pola...
// }

// const qualityRatingValues: { [key in QualityRating]: number } = {
//   deep: 3,
//   neutral: 2,
//   shallow: 1,
//   high: 3,
//   medium: 2,
//   low: 1,
//   productive: 2,
//   unproductive: 1,
// };

// QRate → QualityRate // QR / QltyR // Rate → Rating /
