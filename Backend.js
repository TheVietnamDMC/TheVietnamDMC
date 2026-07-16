function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  var subject = "New Quote Request – " + data.company + " (" + data.name + ")";
  
  var body = `
New quote request received from your website.

━━━━━━━━━━━━━━━━━━━━━━━
AGENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━
Agent Name    : ${data.name}
Company       : ${data.company}
Email         : ${data.email}
Phone/WhatsApp: ${data.phone}

━━━━━━━━━━━━━━━━━━━━━━━
TRAVEL REQUIREMENT
━━━━━━━━━━━━━━━━━━━━━━━
No. of Pax    : ${data.pax || "Not specified"}
Hotel Category: ${data.hotel_cat || "Not specified"}

Itinerary & Requirements:
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━
Sent from TheVietnamDMC Quote Form
`;

  MailApp.sendEmail({
    to: "sales@thevietnamdmc.com",   
    subject: subject,
    body: body
  });

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
