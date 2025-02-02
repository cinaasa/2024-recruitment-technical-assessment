
/**
 * Task 1
 */
function leafFiles(files) {
  has_children = {}
  for (file of files) {
    if (file.id in has_children) {
      has_children[file.parent] = true;
    } else {
      has_children[file.id] = false;
      has_children[file.parent] = true;
    }
  }

  // if file has no children, it is a leaf, push to new array
  leaves = new Array()
  for (file in has_children) {
    if (has_children[file] == false) {
      file_data = files.find(x => x.id == file);
      leaves.push(file_data.name);
    }
  }

  return leaves;
}

/**
 * Task 1
 */
function kLargestCategories(files, k) {
  categories_list = {};

  for (i = 0; i < files.length; i++) {
    // for every category in a file, increase category count in categories_list by 1
    for (category of files[i].categories) {
      if (category in categories_list) {
        categories_list[category] += 1;
      } else {
        categories_list[category] = 0;
      }
    }
  }

  // sort categories by most frequent, then alphabetically
  sorted = Object.keys(categories_list).sort((a, b) => {
    if (categories_list[b] - categories_list[a] != 0) {
      return categories_list[b] - categories_list[a];
    } else {
      return a.localeCompare(b);
    }
  });

  // remove extra categories
  if (sorted.length > k) {
    sorted.length = k;
  }

  return sorted;
}

/**
 * Task 1
 */
function largestFileSize(files) {
  let max = 0;   // max file size
  let size = 0; // size of current file & its children
  for (file of files) {
    if (file.parent == -1) {
      size = file.size + getChildrenSize(file, files, 0);
    }
    if (size > max) {
      max = size;
    }
  }
  return max;
}

// function that gets all the children, grandchildren, etc. of a certain file
function getChildrenSize(file, files, size) {
  let children = files.filter((x) => x.parent == file.id);
  
  if (children.length > 0) {
    for (child of children) {
      size += child.size + getChildrenSize(child, files, 0);
    }
  }

  return size;
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    
    return true;
}


const testFiles = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 2, name: "Image.jpg", categories: ["Media", "Photos"], parent: 34, size: 2048 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 4096 },
    { id: 8, name: "Backup.zip", categories: ["Backup"], parent: 233, size: 8192 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: 3, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: 34, size: 6144 },
    { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
    { id: 55, name: "Code.py", categories: ["Programming"], parent: -1, size: 1536 },
    { id: 89, name: "Audio.mp3", categories: ["Media", "Audio"], parent: 34, size: 2560 },
    { id: 144, name: "Spreadsheet2.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 2048 },
    { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 },
];

const testFiles2 = [
];

const testFiles3 = [
  { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 }
];

console.assert(arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]
));


// Task 2 tests
// test k < number of categories
// test sorting alphabetically works
console.assert(arraysEqual(
    kLargestCategories(testFiles, 3),
    ["Documents", "Folder", "Media"]
));

// test k > number of categories
console.assert(arraysEqual(
  kLargestCategories(testFiles, 100),
  ["Documents", "Folder", "Media", "Excel", "Audio", "Backup", "Photos", "Presentation", "Programming", "Videos"]
));

// test when there are no files
console.assert(arraysEqual(
  kLargestCategories(testFiles2, 2),
  []
));


// Task 3 tests

console.assert(largestFileSize(testFiles) == 20992)

// if there are no files
console.assert(largestFileSize(testFiles2) == 0)

// if there is one file
console.assert(largestFileSize(testFiles3) == 4096)
