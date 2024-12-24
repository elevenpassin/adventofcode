import { open } from 'node:fs/promises'
import { resolve } from 'node:path'

(async function () {
  try {
    const inputFilePath = resolve(import.meta.dirname, './input.txt');
    // create a file handle to the input file
    const contents = await open(inputFilePath);

    const listA = [];
    const listB = [];

    // read the input line by line and populate listA & listB
    for await (const line of contents.readLines()) {
      const [itemA, itemB] = line.split('   ');
      listA.push(itemA);
      listB.push(itemB);
    }

    listA.sort();
    listB.sort();

    // We're assuming that both lists will be of equal length here and iterating
    // over the list to calculate the distance and then add it to the
    // accumulation value.
    const sum = listA.reduce((accVal, _curVal, idx) => {
      const distance = Math.abs(listA[idx] - listB[idx]);
      return accVal + distance
    }, 0);

    // Final answer!
    console.log(sum);
  } catch (err) {
    throw err
  }
})()
