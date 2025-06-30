// script.js

let array = [];

function generateBars() {
  array = Array.from({ length: 30 }, () => Math.floor(Math.random() * 300) + 20);
  const container = document.getElementById("bars-container");
  container.innerHTML = "";
  array.forEach((value, i) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    bar.textContent = value;
    bar.id = `bar-${i}`;
    container.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function merge(arr, l, m, r) {
  const n1 = m - l + 1;
  const n2 = r - m;
  const L = [], R = [];

  for (let i = 0; i < n1; i++) L.push(arr[l + i]);
  for (let j = 0; j < n2; j++) R.push(arr[m + 1 + j]);

  let i = 0, j = 0, k = l;

  while (i < n1 && j < n2) {
    const barK = document.getElementById(`bar-${k}`);
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      barK.style.height = `${L[i]}px`;
      barK.textContent = L[i];
      barK.style.backgroundColor = "green";
      i++;
    } else {
      arr[k] = R[j];
      barK.style.height = `${R[j]}px`;
      barK.textContent = R[j];
      barK.style.backgroundColor = "green";
      j++;
    }
    await sleep(100);
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    const barK = document.getElementById(`bar-${k}`);
    barK.style.height = `${L[i]}px`;
    barK.textContent = L[i];
    barK.style.backgroundColor = "green";
    await sleep(100);
    i++; k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    const barK = document.getElementById(`bar-${k}`);
    barK.style.height = `${R[j]}px`;
    barK.textContent = R[j];
    barK.style.backgroundColor = "green";
    await sleep(100);
    j++; k++;
  }
}

async function mergeSort(arr, l, r) {
  if (l >= r) return;
  const m = l + Math.floor((r - l) / 2);
  await mergeSort(arr, l, m);
  await mergeSort(arr, m + 1, r);
  await merge(arr, l, m, r);
}

function startSort() {
  mergeSort(array, 0, array.length - 1);
}

// Generate bars initially
window.onload = generateBars;
