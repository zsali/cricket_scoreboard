let currentStep = 1;

function showStep(step) {
  document.querySelector(".step.active").classList.remove("active");
  document.getElementById("step" + step).classList.add("active");
}

function validateStep(step) {
  let isValid = true;
  if (step === 1) {
    let option1 = document.getElementById("option1").value;
    let option2 = document.getElementById("option2").value;
    document.getElementById("errorOption1").style.display = option1
      ? "none"
      : "block";
    document.getElementById("errorOption2").style.display = option2
      ? "none"
      : "block";

    secondStepVal(option1, option2);
    isValid = option1 && option2;

    if (option1 && option2 && option1 === option2) {
      errorOption2.textContent =
        "First Team cannot be the same as Second Team.";
      errorOption2.style.display = "block";
      isValid = false;
    }
    if (option2 && option1 != option2) {
      errorOption2.style.display = "none";
    }
  } else if (step === 2) {
    const tossWinner = document.querySelector(
      'input[name="tossWinner"]:checked'
    );
    document.getElementById("errorTossWinner").style.display = tossWinner
      ? "none"
      : "block";
    isValid = !!tossWinner;
  } else if (step === 3) {
    const battingFirst = document.querySelector(
      'input[name="battingFirst"]:checked'
    );
    document.getElementById("errorBattingFirst").style.display = battingFirst
      ? "none"
      : "block";
    isValid = !!battingFirst;
  }
  return isValid;
}

function nextStep() {
  if (validateStep(currentStep)) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  currentStep--;
  showStep(currentStep);
}

function submitForm() {
  if (validateStep(currentStep)) {
    const form = document.getElementById("multiStepForm");
    form.submit();
    window.location.href = "score.html";
  }
}

function secondStepVal(option1, option2) {
  let team1Input = document.querySelectorAll(".team1radio");
  let team1label = document.querySelectorAll(".team1label");

  team1Input.forEach((input) => {
    input.value = option1;
  });
  team1label.forEach((label) => {
    label.innerText = transformString(option1);
  });

  let team2Input = document.querySelectorAll(".team2radio");
  let team2label = document.querySelectorAll(".team2label");

  team2Input.forEach((input) => {
    input.value = option2;
  });
  team2label.forEach((label) => {
    label.innerText = transformString(option2);
  });
}

function transformString(str) {
  let stringWithSpaces = str.replace(/_/g, " ");

  let words = stringWithSpaces.split(" ");

  let transformedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  let transformedString = transformedWords.join(" ");

  return transformedString;
}


