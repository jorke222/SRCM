// admin.js

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: function(fetchInfo, successCallback, failureCallback) {
            db.collection('reservations')
                .where('date', '>=', fetchInfo.startStr)
                .where('date', '<=', fetchInfo.endStr)
                .get()
                .then(snapshot => {
                    const events = snapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            title: `${data.name} (${data.email})`,
                            start: `${data.date}T${data.time}`,
                            end: `${data.date}T${data.time}`,
                            extendedProps: {
                                phone: data.phone
                            }
                        };
                    });
                    successCallback(events);
                })
                .catch(error => {
                    console.error('Error fetching reservations: ', error);
                    failureCallback(error);
                });
        },
        eventClick: function(info) {
            if (confirm(`¿Desea eliminar la cita de ${info.event.title}?`)) {
                db.collection('reservations').doc(info.event.id).delete().then(() => {
                    alert('Cita eliminada.');
                    info.event.remove();
                }).catch(error => {
                    console.error('Error removing document: ', error);
                    alert('No se pudo eliminar la cita.');
                });
            }
        }
    });

    calendar.render();
});
