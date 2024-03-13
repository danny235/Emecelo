export function addCommas(number) {
  if (number === null || number === undefined) return number;

  // Convert the number to a string
  const numberStr = number.toString();

  // Split the number into integer and decimal parts
  const parts = numberStr.split('.');

  // Format the integer part with commas
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // If there is a decimal part, rejoin it with the integer part
  if (parts.length > 1) {
    return integerPart + '.' + parts[1];
  } else {
    return integerPart;
  }
}


export function roundToNearestWholeNumber(decimal) {
  return Math.round(decimal);
}

export function formatTimeString(dateString) {
  // Get the local time zone offset in minutes

  const date = new Date(dateString);

  // Use toLocaleTimeString to format the time in the user's local timezone
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedTime;
}

export function formatDateString(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const formattedDate = `${day.toString().padStart(2, "0")}/${(month + 1)
    .toString()
    .padStart(2, "0")}/${year}`;

  return formattedDate;
}

// // Example usage:
// var updatedTime = addTime('minutes', 10); // Add 10 minutes

// console.log(updatedTime);

export function getTimeAgo(dateString) {
  const currentDate = new Date();
  const inputDate = new Date(dateString);
  const timeDifference = currentDate - inputDate;

  // Calculate seconds, minutes, and hours
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  // Check the conditions and return the appropriate string
  if (timeDifference < 1000) {
    return "just now";
  } else if (seconds < 60) {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (inputDate.getDate() === currentDate.getDate() - 1) {
    return "yesterday";
  } else {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth();
    const day = inputDate.getDate();
    return `${day.toString().padStart(2, "0")}/${(month + 1)
      .toString()
      .padStart(2, "0")}/${year}`;
  }
}

// Function to generate a random ID
function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

// Set to store generated IDs for uniqueness checking
const generatedIds = new Set();
const idLength = 10; // Adjust the length of the ID as needed

// Generate a unique random ID
export function generateUniqueRandomId() {
  let id;
  do {
    id = generateRandomId(idLength);
  } while (generatedIds.has(id));

  generatedIds.add(id);
  return id;
}

