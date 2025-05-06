export function ReminderBody(): string {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f7f9fc;
        color: #333;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
      }
      .details {
        margin-top: 20px;
        line-height: 1.6;
      }
      .highlight {
        font-weight: bold;
        color: #0078d4;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: 12px;
        color: #777;
      }
      .button {
        background-color: #0078d4;
        color: #fff;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 6px;
        display: inline-block;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>🛫 Flight Reminder – SkyWings Airlines</h2>
      </div>
      <p>Dear [Passenger Name],</p>
      <p>This is a friendly reminder about your upcoming flight with <strong>SkyWings Airlines</strong>.</p>
      <div class="details">
        <p><span class="highlight">Flight:</span> [Flight Number]</p>
        <p><span class="highlight">Date:</span> [Flight Date]</p>
        <p><span class="highlight">Departure:</span> [Departure Airport] at [Departure Time]</p>
        <p><span class="highlight">Arrival:</span> [Arrival Airport] at [Arrival Time]</p>
        <p><span class="highlight">Booking Reference:</span> [Booking ID]</p>
      </div>
      <a href="[Manage Booking URL]" class="button">Manage Booking</a>
      <div class="footer">
        <p>Please arrive at the airport at least 2 hours before your departure time.</p>
        <p>Thank you for choosing SkyWings Airlines. Have a pleasant journey!</p>
      </div>
    </div>
  </body>
</html>
  `;
}
