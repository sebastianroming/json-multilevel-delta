import test from 'ava';
import m from '.';

const objectA = { 'a': 'b', 'c': 'd' };
const objectB = { 'c': 'd' };

test('detect the delta length', t => {
  t.is(m(objectA, objectB).length, 1);
});

test('detect the correct delta object', t => {
  t.deepEqual(m.json(objectA, objectB), { 'a': 'b' });
});
