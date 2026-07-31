// ===== AI BREED FINDER - Multi-step Questionnaire =====

let currentStep = 1;
const totalSteps = 12;

document.addEventListener('DOMContentLoaded', function() {
  // Initialize first step
  showStep(1);

  // Handle option selection
  document.querySelectorAll('.bf-option input[type="radio"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      if (this.checked) {
        // Auto-advance after a short delay
        setTimeout(function() {
          if (currentStep < totalSteps) {
            nextStep();
          }
        }, 400);
      }
    });
  });

  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      if (currentStep < totalSteps && isStepAnswered(currentStep)) {
        nextStep();
      }
    }
    if (e.key === 'ArrowLeft') {
      if (currentStep > 1) {
        prevStep();
      }
    }
  });
});

function showStep(step) {
  // Hide all steps
  document.querySelectorAll('.bf-step').forEach(function(el) {
    el.classList.remove('active');
  });

  // Show current step
  var currentEl = document.querySelector('.bf-step[data-step="' + step + '"]');
  if (currentEl) {
    currentEl.classList.add('active');
  }

  // Update progress
  var progress = (step / totalSteps) * 100;
  var fill = document.getElementById('progressFill');
  if (fill) {
    fill.style.width = progress + '%';
  }

  // Update step indicator
  var currentStepEl = document.getElementById('currentStep');
  if (currentStepEl) {
    currentStepEl.textContent = step;
  }

  // Update buttons
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var submitBtn = document.getElementById('submitBtn');

  if (prevBtn) {
    prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
  }

  if (step === totalSteps) {
    if (nextBtn) nextBtn.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'inline-flex';
  } else {
    if (nextBtn) nextBtn.style.display = 'inline-flex';
    if (submitBtn) submitBtn.style.display = 'none';
  }

  // Scroll to top of form
  var form = document.getElementById('breedFinderForm');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Focus first option
  var firstRadio = currentEl ? currentEl.querySelector('.bf-option input[type="radio"]') : null;
  if (firstRadio) {
    setTimeout(function() { firstRadio.focus(); }, 300);
  }
}

function nextStep() {
  if (!isStepAnswered(currentStep)) {
    shakeStep(currentStep);
    return;
  }

  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

function isStepAnswered(step) {
  var stepEl = document.querySelector('.bf-step[data-step="' + step + '"]');
  if (!stepEl) return false;

  var checked = stepEl.querySelector('input[type="radio"]:checked');
  return checked !== null;
}

function shakeStep(step) {
  var stepEl = document.querySelector('.bf-step[data-step="' + step + '"]');
  if (!stepEl) return;

  stepEl.style.animation = 'none';
  stepEl.offsetHeight; // trigger reflow
  stepEl.style.animation = 'shake 0.4s ease';

  // Show hint
  var hint = stepEl.querySelector('.bf-step-hint');
  if (!hint) {
    hint = document.createElement('p');
    hint.className = 'bf-step-hint';
    hint.style.cssText = 'color: var(--error); font-size: 0.85rem; margin-top: -20px; margin-bottom: 16px; text-align: center; animation: fadeIn 0.3s ease;';
    hint.textContent = 'Please select an option to continue.';
    stepEl.querySelector('.bf-options').after(hint);
  }
}

// Add shake animation
var style = document.createElement('style');
style.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
}
`;
document.head.appendChild(style);