import './sass/style.scss';
import Swipe from '@alaskaairux/ods-toast/dist/swipe.js';
import Toaster from '@alaskaairux/ods-toast/dist/toaster';

window.Swipe = Swipe;
const toaster = new Toaster();

/* Import any web components used here */
import '@alaskaairux/ods-button/dist/auro-button';
import '@alaskaairux/auro-checkbox';
import '@alaskaairux/auro-checkbox/dist/auro-checkbox-group';
import '@alaskaairux/ods-toast';

function getCheckboxLegend(selectedValues) {
  return `Your Choice: ${JSON.stringify(selectedValues)}`;
}

function getSelectedCheckboxValues() {
  return Array.from(checkboxes)
    .filter((cbx) => cbx.checked)
    .map((cbx) => cbx.value);
}

function updateCheckboxLegend(e) {
  const selectedValues = getSelectedCheckboxValues();
  checkboxLegend.textContent = getCheckboxLegend(selectedValues);
}

function changeToastButtonType() {
  if (buttonType === 'primary') {
    toastButton.setAttribute('secondary', true);
    buttonType = 'secondary';
  } else {
    toastButton.removeAttribute('secondary');
    buttonType = 'primary';
  }
}

function toast() {
  const message = buttonType === 'primary' ? 'message 1' : 'message 2';
  toaster.add(message);
}

let buttonType = 'primary';
const checkboxLegend = document.querySelector('#checkbox-legend');
const checkboxGroup = document.querySelector('auro-checkbox-group');
const checkboxes = document.querySelectorAll('auro-checkbox');
const changeButton = document.querySelector('#change-button');
const toastButton = document.querySelector('#toast-button');

checkboxGroup.addEventListener('change', updateCheckboxLegend);
changeButton.addEventListener('click', changeToastButtonType);
toastButton.addEventListener('click', toast);

updateCheckboxLegend();
