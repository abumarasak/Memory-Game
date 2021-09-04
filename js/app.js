// select the Start game Button
document.querySelector(".control-buttons span").onclick = function () {
  // prompt window to ask form Name
  let yourName = prompt("What's your name?");

  if (yourName == null || yourName == "") {
    // set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown";
    document.getElementById("guitar").play();

    // Name is not Empty
  } else {
    // Set Name to your name
    document.querySelector(".name span").innerHTML = yourName;
    document.getElementById("guitar").play();
  }

  // Remove Splash Screen
  document.querySelector(".control-buttons").remove();
};
// Effect Duration
let duration = 1000,
  //Select blocks container
  blocksContainer = document.querySelector(".memory-game-blocks"),
  // create array from game blocks
  blocks = Array.from(blocksContainer.children),
  // create range of key
  orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

// add order css property to game blocks
blocks.forEach((block, index) => {
  //add css order property
  block.style.order = orderRange[index];
  //add click event
  block.addEventListener("click", function () {
    // trigger the flip block function
    flipBlock(block);
  });
});

// flip block function
function flipBlock(selectedBlock) {
  // add class is flipped
  selectedBlock.classList.add("is-flipped");
  //collect all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  //if theres two selected blocks
  if (allFlippedBlocks.length === 2) {
    // stop clicking function
    stopClicking();
    //check Matched block function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// stop clicking function
function stopClicking() {
  // Add class no clicking on main container
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    // remove class no clicking after the duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
// check Matched block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.images === secondBlock.dataset.images) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}
// shuffle function
function shuffle(array) {
  //settings vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    //get random numper
    random = Math.floor(Math.random() * current);

    // decrease length by one
    current--;

    // save current element in stash
    temp = array[current];

    //current element + random Element
    array[current] = array[random];

    // random Element = Get Element from stash
    array[random] = temp;
  }
  return array;
}
