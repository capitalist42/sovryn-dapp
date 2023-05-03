import { setOutput, setFailed } from '@actions/core';

try {
  console.log(`Hello World!`);
  const time = new Date().toTimeString();
  setOutput('time', time);
} catch (error) {
  setFailed(error.message);
}
