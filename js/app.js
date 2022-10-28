// FORM
const nameInput = document.querySelector('#firstname');
const surnameInput = document.querySelector('#surname');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const ritualInput = document.querySelector('#ritual');
const dateInput = document.querySelector('#date');
const timeInput = document.querySelector('#time');

// UI
const formBooking = document.querySelector('#form-booking');
const controlBooking = document.querySelector('#control-booking');
// const contentBooking = document.querySelector('#control');

let editing;

class Quotes{
        constructor(){
          this.quotes = [];
        }
        addQuote(quote){
          this.quotes =[...this.quotes, quote]
        }
        deleteQuote(id){
          this.quotes = this.quotes.filter(quote => quote.id !== id);
        }
        editQuote(quoteUpDate){
            this.quotes = this.quotes.map(quote => quote.id === quoteUpDate.id ? quoteUpDate : quote);
        }
      }
      
const adminQuotes = new Quotes();

class UI{
   printQuotes({quotes}){
    this.clearHTML();

    quotes.forEach( quote =>{
      const {firstname, surname, phone, email, ritual, date, time, id } = quote;

      const divQuote = document.createElement('div');
      divQuote.classList.add('control__quote');
      divQuote.dataset.id = id;

      // SCRIPTING ELEMENTS
      const firstNamePrint = document.createElement('p');
      firstNamePrint.innerHTML = `<span class="control__name">Nombre:   </span> ${firstname}`;

      const surNamePrint = document.createElement('p');
      surNamePrint.innerHTML = `<span class="control__name">Apellidos:   </span> ${surname}`;
      
      const phonePrint = document.createElement('p');
      phonePrint.innerHTML = `<span class="control__name">Teléfono:   </span> ${phone}`;
      
      const emailPrint = document.createElement('p');
      emailPrint.innerHTML = `<span class="control__name">Email:   </span> ${email}`;
      
      const ritualPrint = document.createElement('p');
      ritualPrint.innerHTML = `<span class="control__name">Ritual:   </span> ${ritual}`;
      
      const datePrint = document.createElement('p');
      datePrint.innerHTML = `<span class="control__name">Fecha:   </span> ${date}`;

      const timePrint = document.createElement('p');
      timePrint.innerHTML = `<span class="control__name">Hora:   </span> ${time}`;

      // BOTON EDIT
      const btnEdit = document.createElement('button');
      btnEdit.classList.add('control__btnDelete');
      btnEdit.innerHTML = 'Editar';
      btnEdit.onclick = () => loadEdit(quote)

      // BOTTON DELETE
      const btnDelete = document.createElement('button');
      btnDelete.classList.add('control__btnDelete');
      btnDelete.innerHTML= 'Eliminar' ;
      btnDelete.onclick = () => deleteQuote(id);

      
      
      // ADD DIVQOUTE
      divQuote.appendChild(firstNamePrint);
      divQuote.appendChild(surNamePrint);
      divQuote.appendChild(phonePrint);
      divQuote.appendChild(emailPrint);
      divQuote.appendChild(ritualPrint);
      divQuote.appendChild(datePrint);
      divQuote.appendChild(timePrint);
      divQuote.appendChild(btnEdit);
      divQuote.appendChild(btnDelete);

      // ADD HTML
      controlBooking.appendChild(divQuote);
    })
   }

   clearHTML(){
    while(controlBooking.firstChild){
              controlBooking.removeChild(controlBooking.firstChild)
    }
   }
}

const ui = new UI();

eventListeners();
function eventListeners() {
  nameInput.addEventListener('input',dataBooking);
  surnameInput.addEventListener('input',dataBooking);
  phoneInput.addEventListener('input',dataBooking);
  emailInput.addEventListener('input',dataBooking);
  ritualInput.addEventListener('input',dataBooking);
  dateInput.addEventListener('input',dataBooking);
  timeInput.addEventListener('input',dataBooking);

  formBooking.addEventListener('submit', newBooking)
}

const bookingObject ={
      firstname: '',
      surname: '',
      phone:'',
      email:'',
      ritual: '',
      date:'',
      time:''
}

function dataBooking(e){
  bookingObject[e.target.name] = e.target.value;
    
}

// VALIDATION
function newBooking(e){
  e.preventDefault();
  const {firstname, surname, phone, email, ritual, date, time } = bookingObject;
  // if(firstname === '' || surname === '' || phone === '' || email === '' || ritual === '' || date === '' || time === ''){
  //   ui.printAlert('Todos los campos son obligatorios', 'error')
  //   return;
  // }
  
  // EDIT
  if(editing){
    // ui.printAlert('Editado correctamente')
    // PASS OBJECT QUOTE TO EDIT
    adminQuotes.editQuote({...bookingObject})

  // formBooking.querySelector('button[type="submit"]').textContent = 'Reservar';
  editing =false;

  }else{
    // GENERATE ID UNIQUE
    bookingObject.id = Date.now();
    //  CREATE NEW QUOTES
    adminQuotes.addQuote({...bookingObject});
    // MESSAGE CORRECT CHANGES
    // ui.printAlert('Se agregó correctamente')
  }
  
  restartForm();
  formBooking.reset();

  // SHOW HTML BOOKINGS
  ui.printQuotes(adminQuotes)
}

 function restartForm() {
      bookingObject.firstname = '';
      bookingObject.surname = '';
      bookingObject.phone = '';
      bookingObject.email = '';
      bookingObject.ritual = '';
      bookingObject.date = '';
      bookingObject.time = '';

 }

//  DELETE
function deleteQuote(id){
  adminQuotes.deleteQuote(id)
  ui.printQuotes(adminQuotes)
}

// EDIT
function loadEdit(quote){
  const {firstname, surname, phone, email, ritual, date, time, id } = quote;
 nameInput.value = firstname;
 surnameInput.value = surname;
 phoneInput.value = phone;
 emailInput.value = email;
 ritualInput.value = ritual;
 dateInput.value = date;
 timeInput.value = time;

//  FILL INPUTS
bookingObject.firstname = firstname;
bookingObject.surname = surname;
bookingObject.phone = phone;
bookingObject.email = email;
bookingObject.ritual = ritual;
bookingObject.date = date;
bookingObject.time = time;
bookingObject.id = id;

// Change btn text
// formBooking.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

editing = true;
}





















