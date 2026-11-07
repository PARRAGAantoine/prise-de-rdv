/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - SYNCHRONISATION GOOGLE CALENDAR (ANTOINE PARRAGA)
 * =========================================================================
 * 
 * Ce script est à coller dans votre projet Google Apps Script :
 * https://script.google.com
 * 
 * Il gère :
 * 1. doGet : Lecture en direct des rendez-vous et indisponibilités de votre agenda Google.
 *    -> Si vous supprimez un RDV dans Google Calendar, il se libère automatiquement sur le site !
 * 2. doPost : Création automatique du rendez-vous dans Google Calendar lors d'une réservation sur le site.
 */

// 1. Lecture en direct de l'agenda Google (GET)
function doGet(e) {
  try {
    var calendar = CalendarApp.getDefaultCalendar();
    var now = new Date();
    
    // Période d'analyse : d'aujourd'hui 00h00 jusqu'à +60 jours
    var startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var endDate = new Date(startDate.getTime() + 60 * 24 * 60 * 60 * 1000);
    
    var events = calendar.getEvents(startDate, endDate);
    var busySlots = [];
    
    for (var i = 0; i < events.length; i++) {
      var ev = events[i];
      if (ev.isAllDayEvent()) {
        busySlots.push({
          allDay: true,
          date: Utilities.formatDate(ev.getStartTime(), "Europe/Paris", "yyyy-MM-dd")
        });
      } else {
        busySlots.push({
          allDay: false,
          date: Utilities.formatDate(ev.getStartTime(), "Europe/Paris", "yyyy-MM-dd"),
          startTime: Utilities.formatDate(ev.getStartTime(), "Europe/Paris", "HH:mm"),
          endTime: Utilities.formatDate(ev.getEndTime(), "Europe/Paris", "HH:mm"),
          title: ev.getTitle()
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      count: busySlots.length,
      events: busySlots
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 2. Enregistrement d'une nouvelle réservation (POST)
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var calendar = CalendarApp.getDefaultCalendar();
    
    // Format de la date (ex: "2026-11-12") et des heures (ex: "14:00")
    var dateParts = data.date.split("-");
    var startParts = data.startTime.split(":");
    var endParts = data.endTime.split(":");
    
    var year = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1;
    var day = parseInt(dateParts[2], 10);
    
    var startTime = new Date(year, month, day, parseInt(startParts[0], 10), parseInt(startParts[1], 10), 0);
    var endTime = new Date(year, month, day, parseInt(endParts[0], 10), parseInt(endParts[1], 10), 0);
    
    var clientName = data.clientName || "Client";
    var clientPhone = data.clientPhone || "Non renseigné";
    var clientEmail = data.clientEmail || "Non renseigné";
    var clientNotes = data.clientNotes || "Aucun motif";
    
    var title = "RDV - " + clientName;
    var description = "Rendez-vous réservé sur le site officiel\n\n" +
      "Client : " + clientName + "\n" +
      "Téléphone : " + clientPhone + "\n" +
      "Email : " + clientEmail + "\n" +
      "Motif : " + clientNotes;
    
    // Création de l'événement dans Google Calendar
    var event = calendar.createEvent(title, startTime, endTime, {
      description: description
    });
    
    // Notification par email à Antoine
    try {
      MailApp.sendEmail({
        to: "parraga.antoine@gmail.com",
        subject: "Nouveau RDV réservé : " + clientName + " (" + data.date + " à " + data.startTime + ")",
        body: "Bonjour Antoine,\n\nUn nouveau rendez-vous a été réservé et automatiquement ajouté à votre Google Agenda :\n\n" +
          "- Date : " + data.date + "\n" +
          "- Horaire : " + data.startTime + " à " + data.endTime + "\n" +
          "- Client : " + clientName + "\n" +
          "- Téléphone : " + clientPhone + "\n" +
          "- Email : " + clientEmail + "\n" +
          "- Motif : " + clientNotes + "\n\n" +
          "Cet événement est déjà inscrit dans votre Google Calendar."
      });
    } catch (mailErr) {
      console.log("Erreur envoi email (non bloquant):", mailErr);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      eventId: event.getId()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
