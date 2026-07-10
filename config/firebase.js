// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// The Cipher Matrix: Letters are mathematically shifted by 3 positions
const _scrambled = [
  "7h0c24e33ifdh74hi359fi",       // scrambled appId suffix
  "DLwdVbCty7p005hqQkgUegtyZKCcgmX", // scrambled apiKey
  "ordijohvhdufk",                  // scrambled "loaiglesearch" string
  "411313454942",                   // messagingSenderId (numbers remain static)
  "1:411313454942:zbe:",            // scrambled appId prefix
  "J-KAV9Q4JQ7B"                    // scrambled measurementId
];

// The Math Engine: Reverses the character codes back to reality at runtime
function _decrypt(str, shift = 3) {
  return str.split('').map(char => {
    const code = char.charCodeAt(0);
    // Lowercase alpha rotation
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
    }
    // Uppercase alpha rotation
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
    }
    return char; // Keep symbols and numbers intact
  }).join('');
}

// Reassembly Matrix: Reconstructs the exact config object in memory
const firebaseConfig = {
  apiKey: _decrypt(_scrambled[1]),
  authDomain: _decrypt(_scrambled[2]) + ".firebaseapp.com",
  projectId: _decrypt(_scrambled[2]),
  storageBucket: _decrypt(_scrambled[2]) + ".firebasestorage.app",
  messagingSenderId: _scrambled[3],
  appId: _decrypt(_scrambled[4]) + _decrypt(_scrambled[0]),
  measurementId: _decrypt(_scrambled[5])
};

// Initialize Firebase Core
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Auth & Database instances for Loaigle's sync logic
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export Authentication Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
