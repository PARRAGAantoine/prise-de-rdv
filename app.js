// Configuration
const CONFIG = {
  hostEmail: 'parraga.antoine@gmail.com',
  title: 'Prise de RDV',
  slotDurationMinutes: 60,
  travelBufferMinutes: 60,
  minDaysBuffer: 5, // Aujourd'hui + 5 jours (4 jours pleins entre aujourd'hui et le premier créneau)
  startHour: 8,
  endHour: 20,
  // URL de l'API Google Apps Script officielle d'Antoine pour ajout automatique dans Google Calendar & envoi d'email
  googleScriptUrl: 'https://script.google.com/macros/s/AKfycbyhVPILr_P4uZCcVjeytgnk4lAs1MQX7sJTjI4o_R0wQgoBc0XrZCGN2oIO83Bs_hsd/exec'
};

// Horaires de travail (Semaines 44 à 49)
const SHIFTS = [
  // Semaine 44
  { date: '2026-10-26', start: '14:00', end: '19:45' },
  { date: '2026-10-27', start: '05:30', end: '10:30' },
  { date: '2026-10-28', start: '05:30', end: '12:00' },
  { date: '2026-10-29', start: '05:30', end: '10:30' },
  { date: '2026-10-30', start: '05:30', end: '10:30' },
  { date: '2026-10-31', start: '05:30', end: '12:30' },
  { date: '2026-10-31', start: '19:00', end: '20:15' },
  // Semaine 45
  { date: '2026-11-02', start: '14:00', end: '19:45' },
  { date: '2026-11-03', start: '14:00', end: '19:45' },
  { date: '2026-11-04', start: '14:00', end: '19:45' },
  { date: '2026-11-05', start: '14:00', end: '19:45' },
  { date: '2026-11-06', start: '14:00', end: '19:45' },
  { date: '2026-11-07', start: '14:00', end: '19:45' },
  // Semaine 46
  { date: '2026-11-09', start: '05:00', end: '12:30' },
  { date: '2026-11-10', start: '05:30', end: '10:30' },
  { date: '2026-11-11', start: '06:00', end: '13:15' },
  { date: '2026-11-12', start: '05:30', end: '12:30' },
  { date: '2026-11-13', start: '05:30', end: '10:30' },
  { date: '2026-11-14', start: '05:30', end: '11:00' },
  // Semaine 47
  { date: '2026-11-16', start: '05:30', end: '10:30' },
  { date: '2026-11-17', start: '05:30', end: '12:00' },
  { date: '2026-11-18', start: '05:30', end: '12:30' },
  { date: '2026-11-19', start: '05:30', end: '12:30' },
  { date: '2026-11-20', start: '05:30', end: '10:30' },
  { date: '2026-11-21', start: '14:00', end: '19:45' },
  // Semaine 48
  { date: '2026-11-23', start: '14:00', end: '19:45' },
  { date: '2026-11-24', start: '14:00', end: '19:45' },
  { date: '2026-11-25', start: '14:00', end: '19:45' },
  { date: '2026-11-26', start: '14:00', end: '19:45' },
  { date: '2026-11-27', start: '14:00', end: '19:45' },
  { date: '2026-11-28', start: '14:00', end: '19:45' },
  // Semaine 49
  { date: '2026-11-30', start: '05:30', end: '11:00' },
  { date: '2026-11-30', start: '19:00', end: '20:15' },
  { date: '2026-12-01', start: '05:30', end: '12:00' },
  { date: '2026-12-02', start: '05:30', end: '10:30' },
  { date: '2026-12-03', start: '14:00', end: '19:45' },
  { date: '2026-12-04', start: '05:30', end: '11:00' },
  { date: '2026-12-05', start: '05:30', end: '12:30' }
];

let currentYear = 2026;
let currentMonth = 11;
let selectedDate = null;
let selectedSlot = null;

const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

function timeToMin(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function minToTime(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function getMinAllowedDate() {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + CONFIG.minDaysBuffer);
  return minDate.toISOString().split('T')[0];
}

document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  currentYear = today.getFullYear();
  currentMonth = today.getMonth() + 1;

  setupEvents();
  renderCalendar(currentYear, currentMonth);
});

function setupEvents() {
  document.getElementById('prevMonthBtn').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 1) { currentMonth = 12; currentYear--; }
    renderCalendar(currentYear, currentMonth);
  });

  document.getElementById('nextMonthBtn').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 12) { currentMonth = 1; currentYear++; }
    renderCalendar(currentYear, currentMonth);
  });

  document.getElementById('todayBtn').addEventListener('click', () => {
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth() + 1;
    renderCalendar(currentYear, currentMonth);
  });

  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  document.getElementById('cancelModalBtn').addEventListener('click', closeModal);
  document.getElementById('closeSuccessBtn').addEventListener('click', () => {
    document.getElementById('successModal').style.display = 'none';
  });

  document.getElementById('bookingForm').addEventListener('submit', handleFormSubmit);
}

function getAvailableSlotsForDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  if (d.getDay() === 0) return []; // Pas le dimanche
  if (dateStr < getMinAllowedDate()) return []; // Pas avant 4 jours

  // Périodes occupées par le travail avec 1h de trajet avant et après
  const dayShifts = SHIFTS.filter(s => s.date === dateStr);
  const busy = [];
  for (const s of dayShifts) {
    const startM = Math.max(0, timeToMin(s.start) - CONFIG.travelBufferMinutes);
    const endM = timeToMin(s.end) + CONFIG.travelBufferMinutes;
    busy.push({ start: startM, end: endM });
  }

  // Rendez-vous réservés
  const localAppts = JSON.parse(localStorage.getItem('saved_appts') || '[]')
    .filter(a => a.date === dateStr);
  for (const a of localAppts) {
    busy.push({ start: timeToMin(a.startTime), end: timeToMin(a.endTime) });
  }

  const freeSlots = [];
  const startM = CONFIG.startHour * 60;
  const endM = CONFIG.endHour * 60;

  for (let cur = startM; cur + CONFIG.slotDurationMinutes <= endM; cur += CONFIG.slotDurationMinutes) {
    const sStart = cur;
    const sEnd = cur + CONFIG.slotDurationMinutes;
    const conflict = busy.some(b => sStart < b.end && sEnd > b.start);
    if (!conflict) {
      freeSlots.push({
        startTime: minToTime(sStart),
        endTime: minToTime(sEnd)
      });
    }
  }

  return freeSlots;
}

function renderCalendar(year, month) {
  document.getElementById('currentMonthYear').textContent = `${MONTH_NAMES[month - 1]} ${year}`;
  const container = document.getElementById('calendarDays');
  container.innerHTML = '';

  const firstDay = new Date(year, month - 1, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = 0; i < offset; i++) {
    const empty = document.createElement('div');
    empty.className = 'day-cell empty';
    container.appendChild(empty);
  }

  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const slots = getAvailableSlotsForDate(dateStr);
    const dayEl = document.createElement('div');
    dayEl.className = 'day-cell';
    dayEl.textContent = day;

    if (slots.length > 0) {
      dayEl.classList.add('available');
      dayEl.addEventListener('click', () => selectDate(dateStr, slots));
    } else {
      dayEl.classList.add('disabled');
    }

    if (selectedDate === dateStr) {
      dayEl.classList.add('selected');
    }

    container.appendChild(dayEl);
  }

  if (selectedDate && selectedDate.startsWith(`${year}-${String(month).padStart(2, '0')}`)) {
    const slots = getAvailableSlotsForDate(selectedDate);
    selectDate(selectedDate, slots);
  }
}

function selectDate(dateStr, slots) {
  selectedDate = dateStr;

  document.querySelectorAll('.day-cell').forEach(el => {
    if (el.textContent == parseInt(dateStr.split('-')[2], 10) && el.classList.contains('available')) {
      el.classList.add('selected');
    } else {
      el.classList.remove('selected');
    }
  });

  const dateObj = new Date(dateStr + 'T00:00:00');
  const formatted = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  document.getElementById('selectedDateLabel').textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  const container = document.getElementById('slotsContainer');
  container.innerHTML = '';

  if (slots.length === 0) {
    container.innerHTML = '<p class="placeholder-text">Aucun créneau disponible pour cette journée.</p>';
    return;
  }

  slots.forEach(slot => {
    const btn = document.createElement('button');
    btn.className = 'slot-btn';
    btn.textContent = `${slot.startTime} - ${slot.endTime}`;
    btn.addEventListener('click', () => openBookingModal(dateStr, slot));
    container.appendChild(btn);
  });
}

function openBookingModal(dateStr, slot) {
  selectedSlot = { date: dateStr, ...slot };

  const d = new Date(dateStr + 'T00:00:00');
  const formatted = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  document.getElementById('modalDateFormatted').textContent = formatted;
  document.getElementById('modalTimeFormatted').textContent = `${slot.startTime} - ${slot.endTime}`;

  document.getElementById('bookingModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('bookingModal').style.display = 'none';
  selectedSlot = null;
}

async function handleFormSubmit(e) {
  e.preventDefault();
  if (!selectedSlot) return;

  const clientName = document.getElementById('clientName').value.trim();
  const clientEmail = document.getElementById('clientEmail').value.trim() || 'Non renseigné';
  const clientPhone = document.getElementById('clientPhone').value.trim() || 'Non renseigné';
  const clientNotes = document.getElementById('clientNotes').value.trim() || 'Aucun motif';

  const submitBtn = document.getElementById('submitBookingBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enregistrement...';

  const appt = {
    date: selectedSlot.date,
    startTime: selectedSlot.startTime,
    endTime: selectedSlot.endTime,
    clientName,
    clientEmail,
    clientPhone,
    clientNotes
  };

  // 1. Sauvegarde locale pour bloquer immédiatement le créneau sur le site
  const appts = JSON.parse(localStorage.getItem('saved_appts') || '[]');
  appts.push(appt);
  localStorage.setItem('saved_appts', JSON.stringify(appts));

  // 2. Lien direct pour ajout dans Google Calendar d'Antoine (inclus dans l'email envoyé à Antoine)
  const startIso = appt.date.replace(/-/g, '') + 'T' + appt.startTime.replace(':', '') + '00';
  const endIso = appt.date.replace(/-/g, '') + 'T' + appt.endTime.replace(':', '') + '00';
  const gcalTitle = encodeURIComponent(`Prise de RDV - ${clientName}`);
  const gcalDetails = encodeURIComponent(
    `Rendez-vous avec ${clientName}\nTéléphone : ${clientPhone}\nEmail : ${clientEmail}\nMotif : ${clientNotes}`
  );
  const gcalDirectLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&dates=${startIso}/${endIso}&details=${gcalDetails}`;

  // 3. Appel de l'API Google Apps Script (si configurée) pour ajout automatique sans intervention
  if (CONFIG.googleScriptUrl && !CONFIG.googleScriptUrl.includes('placeholder')) {
    try {
      fetch(CONFIG.googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appt)
      }).catch(() => {});
    } catch (err) {}
  }

  // 4. Envoi du mail automatique à Antoine Parraga via FormSubmit
  try {
    fetch('https://formsubmit.co/ajax/parraga.antoine@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `Nouveau Rendez-vous : ${clientName} (${appt.date} à ${appt.startTime})`,
        Nom: clientName,
        Telephone: clientPhone,
        Email: clientEmail,
        Date: appt.date,
        Horaire: `${appt.startTime} - ${appt.endTime}`,
        Motif: clientNotes,
        _autoresponse: `Bonjour, votre rendez-vous avec Antoine Parraga pour le ${appt.date} à ${appt.startTime} a bien été pris en compte.`,
        Lien_Ajout_Google_Calendar: gcalDirectLink
      })
    }).catch(() => {});
  } catch (err) {}

  // 5. Fermeture et affichage de la confirmation sans aucune redirection
  closeModal();
  document.getElementById('bookingForm').reset();
  submitBtn.disabled = false;
  submitBtn.textContent = 'Valider le rendez-vous';

  const detailsBox = document.getElementById('successDetails');
  detailsBox.innerHTML = `
    <strong>${appt.date.split('-').reverse().join('/')}</strong> de <strong>${appt.startTime} à ${appt.endTime}</strong><br>
    Au nom de : <strong>${clientName}</strong>
  `;

  document.getElementById('successModal').style.display = 'flex';
  renderCalendar(currentYear, currentMonth);
}
