# Thunderbird Add-on: Sender-Recipient Exporter

## Overview

**Sender-Recipient Exporter** is a Thunderbird add-on that extracts sender email addresses, sender domains, and recipient email addresses from messages in the currently selected mail folder. The data is exported as a CSV file for easy analysis or sharing.

This add-on is designed to streamline email data processing for users who need to analyze communication patterns or extract specific information from their mail folders.

---

## Features

- Extracts the following information for each email in the selected folder:
  - **Sender**: Email address of the sender.
  - **Sender Domain**: The domain part of the sender's email address.
  - **Recipient**: Email address of each recipient (To, CC, BCC).
- Ensures **unique sender-recipient combinations** to avoid duplicate entries.
- Exports the extracted data as a **CSV file** named `sender-recipient-list.csv`.
- Progress updates displayed during data processing.

---

## Installation

1. Clone or download this repository to your local machine.
2. Open Thunderbird.
3. Navigate to `Tools > Add-ons and Themes` or press `Ctrl+Shift+A`.
4. Click on the gear icon in the top-right corner and select **Install Add-on From File...**.
5. Choose the `manifest.json` file from the downloaded repository.
6. Once installed, you can access the add-on via the Thunderbird toolbar.

---

## Usage

1. **Select a Folder**: In Thunderbird, select the mail folder you want to analyze.
2. **Run the Add-on**: Click on the add-on icon in the toolbar and press the "Export Emails" button.
3. **Wait for Processing**: The add-on will process messages in pages and provide updates as it works.
4. **Download the CSV File**: Once processing is complete, the CSV file will automatically download.

---

## CSV File Format

The exported CSV file contains three columns:

| Sender              | Sender Domain | Recipient           |
|---------------------|---------------|---------------------|
| alice@example.com   | example.com   | bob@example.org     |
| carol@example.net   | example.net   | dave@example.com    |

---

## Technical Details

### Key Functions

1. **`processMessages`**:
   - Processes a batch of messages to extract sender, sender domain, and recipients.
   - Ensures each sender-recipient combination is unique.

2. **`exportToCSV`**:
   - Converts the collected email data into CSV format and triggers a file download.

3. **`handleError`**:
   - Displays error information in the popup if an issue occurs during processing.

4. **`parseEmail`**:
   - Extracts the email address from a formatted email string (e.g., `Name <email@domain.com>`).

5. **`getDomain`**:
   - Extracts the domain part of an email address (e.g., `example.com` from `user@example.com`).

### Pagination
The add-on processes emails in **pages** using Thunderbird's `messages.list()` and `messages.continueList()` APIs. This ensures efficient handling of large folders containing thousands of emails.

---

## Limitations

- Only processes messages in the currently selected mail folder.
- Requires permissions to access the selected folder and its messages.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## Reporting Issues

If you encounter any issues or have feature requests, please [open an issue on GitHub](https://github.com/jsksoft/email-address-extractor/issues/new).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

This add-on leverages Thunderbird's [WebExtension APIs](https://webextension-api.thunderbird.net/) to access and process email data.