function setInfoText(text) {
  document.getElementById("result").innerHTML = text;
}

document.getElementById("getSenderRecipientList").addEventListener("click", async () => {
//async function load() {
  try {
      const emailData = new Set(); // Store unique combinations
      const emailList = []; // Store processed data for CSV export
      const [tab] = await browser.mailTabs.query({ active: true });
      const folder = tab.displayedFolder;

      //let page = await messenger.messages.query({});
      let page = await messenger.messages.list(folder);
      let counter = 0;

      setInfoText(`Processing page ${counter++}...`);
      processMessages(page.messages, emailData, emailList);

      while (page.id) {
          setInfoText(`Processing page ${counter++}...`);
          page = await messenger.messages.continueList(page.id);
          processMessages(page.messages, emailData, emailList);
      }

      exportToCSV(emailList);
      setInfoText("Done! CSV file is ready for download.");
  } catch (e) {
      handleError(e);
  }
//}
});

function processMessages(messages, emailData, emailList) {
  messages.forEach(message => {
      const sender = parseEmail(message.author);
      const senderDomain = getDomain(sender);
      const recipients = message.recipients || []; // Ensure recipients are defined

      recipients.forEach(recipient => {
          const combinationKey = `${sender}-${recipient}`; // Unique key for each combination
          if (!emailData.has(combinationKey)) {
              emailData.add(combinationKey);
              emailList.push({
                  sender,
                  senderDomain,
                  recipient
              });
          }
      });
  });
}

function parseEmail(email) {
  const match = email.match(/<(.+)>/);
  return match ? match[1] : email; // Extract email address or return as-is
}

function getDomain(email) {
  const parts = email.split("@");
  return parts.length === 2 ? parts[1] : "";
}

function exportToCSV(data) {
  const headers = ["Sender", "Sender Domain", "Recipient"];
  const rows = data.map(entry => [entry.sender, entry.senderDomain, entry.recipient]);

  const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "sender-recipient-list.csv";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

function handleError(e) {
  if (e) {
      setInfoText(`The add-on encountered an unexpected error!<br>
      Copy the error message below, redacting any personal information.<br>
      Please leave a review of this add-on or open a GitHub issue with the error message text to report this problem. 
      <a href="https://github.com/jsksoft/email-address-extractor/issues/new">Open GitHub Issue</a><br>`);

      const preElement = document.createElement("pre");
      const codeElement = document.createElement("code");

      codeElement.textContent = e.toString();

      preElement.appendChild(codeElement);
      document.getElementById("result").appendChild(preElement);
  } else {
      setInfoText(`The add-on encountered an unexpected error!<br>
      Copy the error message log in <code>Thunderbird Menu > Tools > Developer Tools > Error Console</code>, redacting any personal information.<br>
      Please leave a review of this add-on or open a GitHub issue with the error message text to report this problem. 
      <a href="https://github.com/jsksoft/email-address-extractor/issues/new">Open GitHub Issue</a><br>`);
  }
}

document.addEventListener("DOMContentLoaded", load);