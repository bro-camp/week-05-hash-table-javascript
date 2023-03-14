function hash(str, size) {
  let hashValue = 0;
  const n = str.length;
  for (let i = 0; i < n; i += 1) {
    hashValue += str.charCodeAt(i);
    hashValue = (hashValue * str.charCodeAt(i)) % size;
  }

  return hashValue;
}

class HashTable {
  _tableSize;

  _table;

  constructor(tableSize = 10) {
    this._tableSize = tableSize;
    this._table = new Array(this._tableSize);
    this._table.fill(null);
  }

  insert(key, value) {
    if (typeof (key) !== 'string') return false;
    const index = hash(key, this._tableSize);
    const node = {
      key,
      value,
      next: this._table[index],
    };
    this._table[index] = node;
    return true;
  }

  lookup(key) {
    const index = hash(key, this._tableSize);
    let node = this._table[index];
    while (node !== null && node.key !== key) {
      node = node.next;
    }
    return node.value;
  }

  delete(key) {
    const index = hash(key, this._tableSize);
    let node = this._table[index];
    let prev = null;
    while (node !== null && node.key !== key) {
      prev = node;
      node = node.next;
    }

    if (node === null) return null;
    if (prev === null) {
      // Delete the head
      this._table[index] = node.next;
    } else {
      prev.next = node.next;
    }
    return node;
  }

  print() {
    for (let i = 0; i < this._tableSize; i += 1) {
      if (this._table[i] === null) {
        console.log(`${i}: ${'----'}`);
      } else {
        let node = this._table[i];
        let s = '';
        while (node !== null) {
          const { key, value } = node;
          s += `{${key}: ${value}} ->`;
          node = node.next;
        }
        console.log(`${i}:  ${s}`);
      }
    }
  }
}

function testHashTable() {
  const h = new HashTable();
  // console.log(h._table);
  // console.log(`Jerry => ${hash('Jerry', 10)}`);
  // console.log(`Albin => ${hash('Albin', 10)}`);
  // console.log(`Nayeem => ${hash('Nayeem', 10)}`);
  // console.log(`Mujeeb => ${hash('Mujeeb', 10)}`);
  // console.log(`Tom => ${hash('Tom', 10)}`);
  // console.log('\n\n');
  h.insert('Tom', 1);
  h.insert('Jerry', 2);
  h.insert('Mujeeb', 3);
  h.insert('Nayeem', 4);
  h.print();
  console.log('\n\n');
  h.delete('Jerry');
  h.print();
  // console.log('\n\n');
  // console.log(`Tom => ${h.lookup('Tom')}`);
  // console.log(`Jerry => ${h.lookup('Jerry')}`);
  // console.log(`Mujeeb => ${h.lookup('Mujeeb')}`);
  console.log('\n\n');
}

testHashTable();
