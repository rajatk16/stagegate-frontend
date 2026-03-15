export const buildProposalBatches = <T>(
  rows: T[],
  buildPayload: (batch: T[]) => unknown,
  maxBytes = 400 * 1024,
) => {
  const batches: T[][] = [];
  let currentBatch: T[] = [];

  for (const row of rows) {
    const testBatch = [...currentBatch, row];

    const payload = JSON.stringify(buildPayload(testBatch));

    if (payload.length > maxBytes && currentBatch.length > 0) {
      batches.push(currentBatch);
      currentBatch = [row];
    } else {
      currentBatch = testBatch;
    }
  }

  if (currentBatch.length) {
    batches.push(currentBatch);
  }

  return batches;
};
