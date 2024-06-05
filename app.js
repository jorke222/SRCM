// app.js

const reservationForm = document.getElementById('reservation-form');
const scheduleList = document.getElementById('schedule-list');

reservationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const date = event.target.date.value;
    const time = event.target.time.value;

    db.collection('reservations')
      .where('date', '==', date)
      .where('time', '==', time)
      .get()
      .then(snapshot => {
          if (!snapshot.empty) {
              alert('Este horario ya está reservado. Por favor, elija otro.');
          } else {
              db.collection('reservations').add({
                  name,
                  email,
                  phone,
                  date,
                  time
              }).then(() => {
                  alert('Reserva realizada con éxito.');
                  reservationForm.reset();
                  loadSchedule(date);
              }).catch(error => {
                  console.error('Error al realizar la reserva: ', error);
              });
          }
      });
});

function loadSchedule(date) {
    scheduleList.innerHTML = '';
    
    db.collection('reservations')
      .where('date', '==', date)
      .orderBy('time')
      .get()
      .then(snapshot => {
          if (snapshot.empty) {
              scheduleList.innerHTML = '<p>No hay reservas para esta fecha.</p>';
          } else {
              snapshot.forEach(doc => {
                  const reservation = doc.data();
                  const reservationItem = document.createElement('div');
                  reservationItem.innerText = `${reservation.time} - ${reservation.name} (${reservation.email}, ${reservation.phone})`;
                  scheduleList.appendChild(reservationItem);
              });
          }
      });
}

document.getElementById('date').addEventListener('change', function(event) {
    const date = event.target.value;
    loadSchedule(date);
});
