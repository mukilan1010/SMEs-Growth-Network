const formSteps = document.querySelectorAll('.form-step');
let currentStep = 0;

function showStep(step) {
  formSteps.forEach((formStep, index) => {
    formStep.classList.toggle('active', index === step);
  });
}

function nextStep() {
  const currentFormStep = formSteps[currentStep];
  const inputs = currentFormStep.querySelectorAll('input, select, textarea');
  let valid = true;

  inputs.forEach(input => {
    if (input.required && !input.value) {
      valid = false;
      input.classList.add('error'); // Add an error class if input is invalid
    } else {
      input.classList.remove('error'); // Remove error class if valid
    }
  });

  if (!valid) {
    alert("Please fill out all required fields marked with an asterisk (*) before proceeding.");
    return; // Stop the function here if validation fails
  }

  currentStep++;
  if (currentStep < formSteps.length) {
    showStep(currentStep); // Show the next step if all fields are valid
  }
}

function prevStep() {
  currentStep--;
  showStep(currentStep);
}

function addMember() {
  const teamMembersContainer = document.getElementById('teamMembersContainer');
  const newMember = document.createElement('div');
  newMember.className = 'team-member';
  newMember.innerHTML = `
    <label for="memberName" class="required">Member Name:</label>
    <input type="text" name="memberName[]" placeholder="Enter member name" required>

    <label for="memberRole" class="required">Role:</label>
    <input type="text" name="memberRole[]" placeholder="Enter member role" required>

    <label for="memberEmail" class="required">Member Email:</label>
    <input type="email" name="memberEmail[]" placeholder="Enter member email" required>

    <label for="phoneNumber" class="required">Phone Number:</label>
    <input type="tel" name="phoneNumber[]" placeholder="Enter phone number" required>

    <label for="linkedin">LinkedIn Profile:</label>
    <input type="url" name="linkedin[]" placeholder="Enter LinkedIn URL">

    <label for="gender">Gender:</label>
    <select name="gender[]">
      <option value="select">Select</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>

    <span class="remove-member" onclick="removeMember(this)">Remove Member</span>
    <h3 style="margin-top: 20px;">DPIIT Certification Support</h3>
    <label>Do you want our support to get DPIIT Certified?</label>
    <label><input type="radio" name="dpiitSupport" value="yes" required> Yes</label>
    <label><input type="radio" name="dpiitSupport" value="no"> No</label>
  `;
  teamMembersContainer.appendChild(newMember);
}

function removeMember(element) {
  element.parentElement.remove();
}

function submitForm() {
  // Implement form submission logic here
  alert("Form submitted!");
}

showStep(currentStep);