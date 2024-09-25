export default class Notes {
  data = [
    'C',
    'C#-Db',
    'D',
    'D#-Eb',
    'E',
    'F',
    'F#-Gb',
    'G',
    'G#-Ab',
    'A',
    'A#-Bb',
    'B',
  ];
  steps = [
    'R',
    undefined,
    undefined,
    '3m',
    '3',
    undefined,
    undefined,
    '5',
    undefined,
    undefined,
    '7',
    '7M',
  ];
  root = 0;

  [Symbol.iterator]() {
    let index = 0;
    const next = () => {
      if (index < this.steps.length) {
        let value = this.steps[index++];
        return { value: value ? this.getNote(value) : undefined, done: false };
      } else {
        return { value: undefined, done: true };
      }
    };
    return { next: next.bind(this) };
  }

  getStringIterator(startingNote: number) {
    let iterator = {
      data: this.data,
      getNote: this.getNote,
      steps: this.steps,
      root: this.root,
      [Symbol.iterator]() {
        let sentinel = this.root;
        let startingStep = 0;
        // get the distance from the root note
        while (sentinel != startingNote) {
          sentinel = ++sentinel % this.data.length;
          startingStep++;
        }
        let index = 0;
        const next = () => {
          if (index < this.data.length) {
            let step = startingStep + index++;
            let value = this.steps[step % this.data.length];
            return {
              value: {
                note: value ? this.getNote(value) : undefined,
                step: value,
              },
              done: false,
            };
          } else {
            return { value: {note: undefined, step: undefined}, done: true };
          }
        };
        return { next: next.bind(this) };
      },
    };
    return iterator;
  }

  setRoot(i: number) {
    this.root = i;
  }

  getNote(i: string): string {
    let index = this.root;
    switch (i) {
      case 'R': {
        break;
      }
      case '2': {
        index = (this.root + 2) % this.data.length;
        break;
      }
      case '3m': {
        index = (this.root + 3) % this.data.length;
        break;
      }
      case '3': {
        index = (this.root + 4) % this.data.length;
        break;
      }
      case '5': {
        index = (this.root + 7) % this.data.length;
        break;
      }
      case '6': {
        index = (this.root + 9) % this.data.length;
        break;
      }
      case '7': {
        index = (this.root + 10) % this.data.length;
        break;
      }
      case '7M': {
        index = (this.root + 11) % this.data.length;
        break;
      }
    }
    return this.data[index];
  }
}
