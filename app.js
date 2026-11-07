// Configuration
const CONFIG = {
  hostEmail: 'parraga.antoine@gmail.com',
  hostName: 'Antoine Parraga',
  title: 'Prise de RDV',
  slotDurationMinutes: 60,
  travelBufferMinutes: 60, // 1h de trajet avant et après le travail
  minDaysBuffer: 5, // Ex: si nous sommes le 07, premier créneau le 12 (4 jours pleins entre les deux)
  startHour: 8,  // 08h00
  endHour: 20    // 20h00
};

// Horaires de travail extraits de vos plannings Intermarché (Semaines 44 à 49)
const DEFAULT_SHIFTS = [
  // Semaine 44
  { id: 's-44-1', date: '2026-10-26', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-44-2', date: '2026-10-27', start: '05:30', end: '10:30', label: 'Intermarché Carmaux', note: '' },
  { id: 's-44-3', date: '2026-10-28', start: '05:30', end: '12:00', label: 'Intermarché Carmaux', note: '' },
  { id: 's-44-4', date: '2026-10-29', start: '05:30', end: '10:30', label: 'Intermarché Carmaux', note: 'Ne fais pas les caddies en partant' },
  { id: 's-44-5', date: '2026-10-30', start: '05:30', end: '10:30', label: 'Intermarché Carmaux', note: '' },
  { id: 's-44-6', date: '2026-10-31', start: '05:30', end: '12:30', label: 'Intermarché Carmaux', note: 'Matin' },
  { id: 's-44-7', date: '2026-10-31', start: '19:00', end: '20:15', label: 'Intermarché Carmaux', note: 'Soir' },
  // Semaine 45
  { id: 's-45-1', date: '2026-11-02', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-45-2', date: '2026-11-03', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-45-3', date: '2026-11-04', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-45-4', date: '2026-11-05', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-45-5', date: '2026-11-06', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-45-6', date: '2026-11-07', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  // Semaine 46
  { id: 's-46-1', date: '2026-11-09', start: '05:00', end: '12:30', label: 'Intermarché Carmaux', note: 'Attention horaire' },
  { id: 's-46-2', date: '2026-11-10', start: '05:30', end: '10:30', label: 'Intermarché Carmaux', note: '' },
  { id: 's-46-3', date: '2026-11-11', start: '06:00', end: '13:15', label: 'Intermarché Carmaux', note: 'Férié travaillé' },
  { id: 's-46-4', date: '2026-11-12', start: '05:30', end: '12:30', label: 'Intermarché Carmaux', note: '' },
  { id: 's-46-5', date: '2026-11-13', start: '05:30', end: '10:30', label: 'Intermarché Carmaux', note: '' },
  { id: 's-46-6', date: '2026-11-14', start: '05:30', end: '11:00', label: 'Intermarché Carmaux', note: '' },
  // Semaine 47
  { id: 's-47-1', date: '2026-11-16', start: '05:30', end: '10:30', label: 'Intermarché Carmaux', note: '' },
  { id: 's-47-2', date: '2026-11-17', start: '05:30', end: '12:00', label: 'Intermarché Carmaux', note: 'Nettoyage' },
  { id: 's-47-3', date: '2026-11-18', start: '05:30', end: '12:30', label: 'Intermarché Carmaux', note: '' },
  { id: 's-47-4', date: '2026-11-19', start: '05:30', end: '12:30', label: 'Intermarché Carmaux', note: '' },
  { id: 's-47-5', date: '2026-11-20', start: '05:30', end: '10:30', label: 'Intermarché Carmaux', note: '' },
  { id: 's-47-6', date: '2026-11-21', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  // Semaine 48
  { id: 's-48-1', date: '2026-11-23', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-48-2', date: '2026-11-24', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-48-3', date: '2026-11-25', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-48-4', date: '2026-11-26', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-48-5', date: '2026-11-27', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-48-6', date: '2026-11-28', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  // Semaine 49
  { id: 's-49-1', date: '2026-11-30', start: '05:30', end: '11:00', label: 'Intermarché Carmaux', note: 'Matin' },
  { id: 's-49-2', date: '2026-11-30', start: '19:00', end: '20:15', label: 'Intermarché Carmaux', note: 'Soir' },
  { id: 's-49-3', date: '2026-12-01', start: '05:30', end: '12:00', label: 'Intermarché Carmaux', note: 'Nettoyage' },
  { id: 's-49-4', date: '2026-12-02', start: '05:30', end: '10:30', label: 'Intermarché Carmaux', note: 'Fruits sec noel' },
  { id: 's-49-5', date: '2026-12-03', start: '14:00', end: '19:45', label: 'Intermarché Carmaux', note: '' },
  { id: 's-49-6', date: '2026-12-04', start: '05:30', end: '11:00', label: 'Intermarché Carmaux', note: '' },
  { id: 's-49-7', date: '2026-12-05', start: '05:30', end: '12:30', label: 'Intermarché Carmaux', note: '' }
];

// LocalStorage helpers
function getStoredShifts() {
  const data = localStorage.getItem('antoine_shifts');
  if (!data) {
    localStorage.setItem('antoine_shifts', JSON.stringify(DEFAULT_SHIFTS));
    return DEFAULT_SHIFTS;
  }
  return JSON.parse(data);
}

function saveStoredShifts(shifts) {
  localStorage.setItem('antoine_shifts', JSON.stringify(shifts));
}

function getStoredAppointments() {
  const data = localStorage.getItem('antoine_appointments');
  return data ? JSON.parse(data) : [];
}

function saveStoredAppointments(appts) {
  localStorage.setItem('antoine_appointments', JSON.stringify(appts));
}

// State
let currentYear = 2026;
let currentMonth = 11; // Novembre = 11
let selectedDate = null;
let selectedSlot = null;
let currentAppointment = null;

const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
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

  setupEventListeners();
  renderCalendar(currentYear, currentMonth);
});

function setupEventListeners() {
  document.getElementById('prevMonthBtn').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
  });

  document.getElementById('nextMonthBtn').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
  });

  document.getElementById('todayBtn').addEventListener('click', () => {
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth() + 1;
    renderCalendar(currentYear, currentMonth);
  });

  // Modal close handlers
  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  document.getElementById('cancelModalBtn').addEventListener('click', closeModal);
  document.getElementById('closeSuccessBtn').addEventListener('click', () => {
    document.getElementById('successModal').style.display = 'none';
  });

  // Booking submit
  document.getElementById('bookingForm').addEventListener('submit', handleBookingSubmit);

  // ICS download button
  document.getElementById('icsBtn').addEventListener('click', downloadIcsFile);

  // Admin modal
  document.getElementById('adminToggleBtn').addEventListener('click', openAdminModal);
  document.getElementById('closeAdminBtn').addEventListener('click', closeAdminModal);

  // Admin tabs
  document.querySelectorAll('.admin-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', (e) => {
      document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      const targetTab = e.target.getAttribute('data-tab');
      document.getElementById('tab-' + targetTab).classList.add('active');
    });
  });

  // Add shift form
  document.getElementById('addShiftForm').addEventListener('submit', handleAddShiftSubmit);
}

function getDaySlotInfo(dateStr) {
  const dateObj = new Date(dateStr + 'T00:00:00');
  const dayOfWeek = dateObj.getDay();
  const minAllowed = getMinAllowedDate();

  if (dayOfWeek === 0) {
    return { status: 'sunday', reason: 'Aucun rendez-vous le dimanche.', slots: [], shifts: [] };
  }

  if (dateStr < minAllowed) {
    return {
      status: 'too_early',
      reason: `La réservation doit se faire au moins 4 jours à l'avance (disponible à partir du ${minAllowed.split('-').reverse().join('/')}).`,
      slots: [],
      shifts: []
    };
  }

  const shifts = getStoredShifts().filter(s => s.date === dateStr);
  const appts = getStoredAppointments().filter(a => a.date === dateStr && a.status !== 'cancelled');

  const busyRanges = [];
  for (const s of shifts) {
    const rawStart = timeToMinutes(s.start);
    const rawEnd = timeToMinutes(s.end);
    const startBuf = Math.max(0, rawStart - CONFIG.travelBufferMinutes);
    const endBuf = rawEnd + CONFIG.travelBufferMinutes;
    busyRanges.push({
      start: startBuf,
      end: endBuf,
      reason: `Travail (${s.start} - ${s.end}) + 1h trajet (${minutesToTime(startBuf)} - ${minutesToTime(endBuf)})`
    });
  }

  for (const a of appts) {
    busyRanges.push({
      start: timeToMinutes(a.startTime),
      end: timeToMinutes(a.endTime),
      reason: 'Rendez-vous déjà pris'
    });
  }

  const slots = [];
  const startMinute = CONFIG.startHour * 60;
  const endMinute = CONFIG.endHour * 60;
  const duration = CONFIG.slotDurationMinutes;

  for (let cur = startMinute; cur + duration <= endMinute; cur += duration) {
    const slotStart = cur;
    const slotEnd = cur + duration;
    const conflict = busyRanges.find(r => slotStart < r.end && slotEnd > r.start);

    slots.push({
      startTime: minutesToTime(slotStart),
      endTime: minutesToTime(slotEnd),
      available: !conflict,
      reason: conflict ? conflict.reason : null
    });
  }

  const availCount = slots.filter(s => s.available).length;
  return {
    status: availCount > 0 ? 'available' : 'full',
    slotsCount: availCount,
    shifts,
    slots
  };
}

function renderCalendar(year, month) {
  const monthTitle = document.getElementById('currentMonthYear');
  monthTitle.textContent = `${MONTH_NAMES[month - 1]} ${year}`;

  const container = document.getElementById('calendarDays');
  container.innerHTML = '';

  const firstDay = new Date(year, month - 1, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  for (let i = 0; i < startOffset; i++) {
    const blank = document.createElement('div');
    blank.className = 'cal-day empty';
    container.appendChild(blank);
  }

  const daysInMonth = new Date(year, month, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const info = getDaySlotInfo(dateStr);
    const dayEl = document.createElement('div');
    dayEl.className = 'cal-day';
    dayEl.setAttribute('data-date', dateStr);

    let badgeText = '';
    if (info.status === 'sunday') {
      dayEl.classList.add('sunday');
      badgeText = 'Dim.';
    } else if (info.status === 'too_early') {
      dayEl.classList.add('too-early');
      badgeText = '< 4j';
    } else if (info.status === 'full') {
      dayEl.classList.add('full');
      badgeText = 'Complet';
    } else if (info.status === 'available') {
      dayEl.classList.add('available');
      badgeText = `${info.slotsCount} créneaux`;
      dayEl.addEventListener('click', () => selectDate(dateStr));
    }

    if (selectedDate === dateStr) {
      dayEl.classList.add('selected');
    }

    dayEl.innerHTML = `
      <span>${d}</span>
      ${badgeText ? `<span class="day-badge">${badgeText}</span>` : ''}
    `;

    container.appendChild(dayEl);
  }

  if (selectedDate && selectedDate.startsWith(`${year}-${String(month).padStart(2, '0')}`)) {
    selectDate(selectedDate);
  }
}

function selectDate(dateStr) {
  selectedDate = dateStr;

  document.querySelectorAll('.cal-day').forEach(el => {
    if (el.getAttribute('data-date') === dateStr) {
      el.classList.add('selected');
    } else {
      el.classList.remove('selected');
    }
  });

  const titleEl = document.getElementById('selectedDateTitle');
  const dateObj = new Date(dateStr + 'T00:00:00');
  const formatted = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  titleEl.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  const noticeEl = document.getElementById('shiftsNotice');
  const slotsContainer = document.getElementById('slotsContainer');

  const info = getDaySlotInfo(dateStr);

  if (info.status !== 'available' && info.status !== 'full') {
    noticeEl.style.display = 'none';
    slotsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <p>${info.reason}</p>
      </div>
    `;
    return;
  }

  if (info.shifts && info.shifts.length > 0) {
    const shiftTexts = info.shifts.map(s => `Poste : ${s.start} - ${s.end} (${s.label || 'Intermarché'})`).join(' &bull; ');
    noticeEl.innerHTML = `🛒 <strong>Planning de travail :</strong> ${shiftTexts} <br><small style="color: #b45309;">(1h de trajet avant et après automatiquement réservée)</small>`;
    noticeEl.style.display = 'block';
  } else {
    noticeEl.innerHTML = `✅ <strong>Journée libre :</strong> Aucun poste de travail planifié ce jour.`;
    noticeEl.style.display = 'block';
  }

  const availableSlots = info.slots.filter(s => s.available);
  if (availableSlots.length === 0) {
    slotsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📅</div>
        <p>Aucun créneau disponible pour cette journée (heures de travail ou réservations complètes).</p>
      </div>
    `;
    return;
  }

  slotsContainer.innerHTML = '';
  info.slots.forEach(slot => {
    const slotCard = document.createElement('div');
    slotCard.className = `slot-item ${slot.available ? 'available' : 'unavailable'}`;

    if (slot.available) {
      slotCard.innerHTML = `
        <div>
          <span class="slot-time">${slot.startTime} - ${slot.endTime}</span>
          <span class="slot-duration">(1 heure)</span>
        </div>
        <button class="btn-book" onclick="openBookingModal('${dateStr}', '${slot.startTime}', '${slot.endTime}')">
          Choisir ce créneau
        </button>
      `;
    } else {
      slotCard.innerHTML = `
        <div>
          <span class="slot-time" style="color: #94a3b8;">${slot.startTime} - ${slot.endTime}</span>
          <span class="slot-duration">(1 heure)</span>
        </div>
        <span class="slot-reason">${slot.reason || 'Indisponible'}</span>
      `;
    }

    slotsContainer.appendChild(slotCard);
  });
}

window.openBookingModal = function(dateStr, startTime, endTime) {
  selectedSlot = { date: dateStr, startTime, endTime };

  const dateObj = new Date(dateStr + 'T00:00:00');
  const formatted = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  document.getElementById('modalDateFormatted').textContent = formatted;
  document.getElementById('modalTimeFormatted').textContent = `De ${startTime} à ${endTime}`;

  document.getElementById('bookingModal').style.display = 'flex';
};

function closeModal() {
  document.getElementById('bookingModal').style.display = 'none';
  selectedSlot = null;
}

function handleBookingSubmit(e) {
  e.preventDefault();
  if (!selectedSlot) return;

  const clientName = document.getElementById('clientName').value.trim();
  const clientEmail = document.getElementById('clientEmail').value.trim();
  const clientPhone = document.getElementById('clientPhone').value.trim();
  const clientNotes = document.getElementById('clientNotes').value.trim();

  const appt = {
    id: 'apt-' + Date.now(),
    title: CONFIG.title,
    date: selectedSlot.date,
    startTime: selectedSlot.startTime,
    endTime: selectedSlot.endTime,
    clientName,
    clientEmail,
    clientPhone,
    clientNotes,
    hostEmail: CONFIG.hostEmail,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  const appts = getStoredAppointments();
  appts.push(appt);
  saveStoredAppointments(appts);

  currentAppointment = appt;

  closeModal();
  document.getElementById('bookingForm').reset();

  // Create Google Calendar URL
  const startIsoStr = appt.date.replace(/-/g, '') + 'T' + appt.startTime.replace(':', '') + '00';
  const endIsoStr = appt.date.replace(/-/g, '') + 'T' + appt.endTime.replace(':', '') + '00';
  const gcalTitle = encodeURIComponent(`${CONFIG.title} - ${appt.clientName}`);
  const gcalDetails = encodeURIComponent(
    `Rendez-vous avec ${appt.clientName}\nEmail: ${appt.clientEmail}\nTéléphone: ${appt.clientPhone}\nNotes: ${appt.clientNotes || 'Aucune'}\nOrganisateur: ${CONFIG.hostEmail}`
  );
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&dates=${startIsoStr}/${endIsoStr}&details=${gcalDetails}&add=${encodeURIComponent(appt.clientEmail)}&add=${encodeURIComponent(CONFIG.hostEmail)}`;

  // Create mailto link for direct notification
  const mailSubject = encodeURIComponent(`Nouveau Rendez-vous : ${appt.clientName} le ${appt.date}`);
  const mailBody = encodeURIComponent(`Bonjour Antoine,\n\nUn nouveau rendez-vous a été pris :\n- Date : ${appt.date}\n- Heure : ${appt.startTime} - ${appt.endTime}\n- Client : ${appt.clientName}\n- Téléphone : ${appt.clientPhone}\n- Email : ${appt.clientEmail}\n- Notes : ${appt.clientNotes}\n\nÀ bientôt !`);
  const mailUrl = `mailto:${CONFIG.hostEmail}?subject=${mailSubject}&body=${mailBody}`;

  const recap = document.getElementById('successRecap');
  recap.innerHTML = `
    <p><strong>Date :</strong> ${appt.date.split('-').reverse().join('/')}</p>
    <p><strong>Horaire :</strong> ${appt.startTime} - ${appt.endTime} (1 heure)</p>
    <p><strong>Participant :</strong> ${appt.clientName} (${appt.clientEmail})</p>
    <p><strong>Hôte :</strong> Antoine Parraga (${CONFIG.hostEmail})</p>
  `;

  document.getElementById('gcalLink').href = gcalUrl;
  document.getElementById('emailAntoineLink').href = mailUrl;

  document.getElementById('successModal').style.display = 'flex';

  renderCalendar(currentYear, currentMonth);
  if (selectedDate) selectDate(selectedDate);
}

function downloadIcsFile() {
  if (!currentAppointment) return;
  const appt = currentAppointment;
  const startIsoStr = appt.date.replace(/-/g, '') + 'T' + appt.startTime.replace(':', '') + '00';
  const endIsoStr = appt.date.replace(/-/g, '') + 'T' + appt.endTime.replace(':', '') + '00';
  const nowIso = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Antoine Parraga//Prise de RDV//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${appt.id}@parraga.antoine`,
    `DTSTAMP:${nowIso}`,
    `DTSTART;TZID=Europe/Paris:${startIsoStr}`,
    `DTEND;TZID=Europe/Paris:${endIsoStr}`,
    `SUMMARY:${appt.title} - ${appt.clientName}`,
    `DESCRIPTION:Rendez-vous avec ${appt.clientName}\\nEmail: ${appt.clientEmail}\\nTéléphone: ${appt.clientPhone}\\nNotes: ${appt.clientNotes || 'Néant'}`,
    `ORGANIZER;CN=Antoine Parraga:mailto:${appt.hostEmail}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${appt.clientName}:mailto:${appt.clientEmail}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rdv_${appt.date}_${appt.startTime.replace(':', 'h')}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Admin Modal
function openAdminModal() {
  document.getElementById('adminModal').style.display = 'flex';
  loadAdminAppointments();
  loadAdminShifts();
}

function closeAdminModal() {
  document.getElementById('adminModal').style.display = 'none';
}

function loadAdminAppointments() {
  const container = document.getElementById('adminApptsList');
  const appts = getStoredAppointments();

  if (!appts || appts.length === 0) {
    container.innerHTML = '<p style="color: #64748b; padding: 1rem;">Aucun rendez-vous enregistré pour le moment.</p>';
    return;
  }

  let html = `
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Heure</th>
            <th>Client</th>
            <th>Contact</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  `;

  appts.slice().reverse().forEach(a => {
    const isCancelled = a.status === 'cancelled';
    html += `
      <tr style="${isCancelled ? 'opacity: 0.5;' : ''}">
        <td><strong>${a.date.split('-').reverse().join('/')}</strong></td>
        <td>${a.startTime} - ${a.endTime}</td>
        <td>${a.clientName}</td>
        <td>${a.clientPhone}<br><small>${a.clientEmail}</small></td>
        <td>${isCancelled ? '<span style="color:red;">Annulé</span>' : '<span style="color:green;">Confirmé</span>'}</td>
        <td>
          ${!isCancelled ? `<button class="btn-danger-sm" onclick="cancelAppointment('${a.id}')">Annuler</button>` : '-'}
        </td>
      </tr>
    `;
  });

  html += '</tbody></table></div>';
  container.innerHTML = html;
}

window.cancelAppointment = function(id) {
  if (!confirm('Confirmer l’annulation de ce rendez-vous ?')) return;
  const appts = getStoredAppointments().map(a => a.id === id ? { ...a, status: 'cancelled' } : a);
  saveStoredAppointments(appts);
  loadAdminAppointments();
  renderCalendar(currentYear, currentMonth);
};

function loadAdminShifts() {
  const tbody = document.getElementById('adminShiftsTable');
  const shifts = getStoredShifts().slice().sort((a, b) => a.date.localeCompare(b.date));

  let html = '';
  shifts.forEach(s => {
    html += `
      <tr>
        <td><strong>${s.date.split('-').reverse().join('/')}</strong></td>
        <td>${s.start} - ${s.end}</td>
        <td>${s.label || 'Intermarché'} ${s.note ? `<br><small style="color:#64748b;">${s.note}</small>` : ''}</td>
        <td>
          <button class="btn-danger-sm" onclick="deleteShift('${s.id}')">&times;</button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

window.deleteShift = function(id) {
  if (!confirm('Supprimer ce poste de travail ?')) return;
  const shifts = getStoredShifts().filter(s => s.id !== id);
  saveStoredShifts(shifts);
  loadAdminShifts();
  renderCalendar(currentYear, currentMonth);
};

function handleAddShiftSubmit(e) {
  e.preventDefault();
  const date = document.getElementById('newShiftDate').value;
  const start = document.getElementById('newShiftStart').value;
  const end = document.getElementById('newShiftEnd').value;
  const label = document.getElementById('newShiftLabel').value;
  const note = document.getElementById('newShiftNote').value;

  const shifts = getStoredShifts();
  shifts.push({
    id: 's-' + Date.now(),
    date,
    start,
    end,
    label: label || 'Intermarché',
    note: note || ''
  });
  saveStoredShifts(shifts);

  alert('Horaire ajouté avec succès !');
  document.getElementById('addShiftForm').reset();
  loadAdminShifts();
  renderCalendar(currentYear, currentMonth);
}
