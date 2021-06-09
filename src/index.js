import './sass/style.scss';

/* Import any web components used here */
import '@alaskaairux/auro-button';
import "@alaskaairux/auro-checkbox";
import "@alaskaairux/auro-checkbox/dist/auro-checkbox-group";
import '@alaskaairux/auro-header';
import '@alaskaairux/auro-input';
import "@alaskaairux/auro-radio";
import "@alaskaairux/auro-radio/dist/auro-radio-group";

let formData = {};

const fNameEl = document.querySelector('#fName');
fNameEl.addEventListener('input', (e) => {
  setValue(e.target.id, e.target.value);
});

const lNameEl = document.querySelector('#lName');
lNameEl.addEventListener('input', (e) => {
  setValue(e.target.id, e.target.value);
});

const flierGroupEl = document.querySelector('#flierGroup');
flierGroupEl.addEventListener('change', (e) => {
  setValue('flier', e.target.value === 'true');
});

const destintationGroupEl = document.querySelector('#destinationGroup');
destintationGroupEl.addEventListener('change', (e) => {
  calcDestinations(e.target.value, e.target.checked);
})

const submitButtonEl = document.querySelector('#submitButton');
submitButtonEl.addEventListener('click', () =>{
  handleSubmit();
})

const formDataEl = document.querySelector('#formData');

function setValue(field, value) {
  if (value === undefined) {
    delete formData[field];
  } else {
    formData[field] = value;
  }

  const hasfName = formData.hasOwnProperty('fName') && formData.fName.length > 0;
  const haslName = formData.hasOwnProperty('lName') && formData.lName.length > 0;
  const hasFlier = formData.hasOwnProperty('flier') && typeof formData.flier === 'boolean';

  if (hasFlier && formData.flier) {
    destintationGroupEl.classList.remove('util_displayHidden');
  } else {
    destintationGroupEl.classList.add('util_displayHidden');
  }

  if (hasfName && haslName && hasFlier) {
    submitButtonEl.removeAttribute('disabled');
  } else {
    if (!submitButtonEl.hasAttribute('disabled')) {
      submitButtonEl.setAttribute('disabled', true);
    }
  }

  formDataEl.innerHTML = JSON.stringify(formData);
}

function calcDestinations(destination, state) {
  let d = []

  if (formData.hasOwnProperty('destinations') && formData.destinations.length > 0) {
    d = formData.destinations;
  }

  if (d.includes(destination) && !state) {
    d.splice(d.indexOf(destination), 1);
  } else if (state) {
    d.push(destination);
  }

  if (d.length > 0) {
    setValue('destinations', d)
  } else {
    if (formData.hasOwnProperty('destinations')) {
      setValue('destinations', undefined);
    }
  }
}

function handleSubmit() {
  console.warn('Form JSON Data:', formData);
  alert(`Form JSON Data: ` + JSON.stringify(formData));
}
