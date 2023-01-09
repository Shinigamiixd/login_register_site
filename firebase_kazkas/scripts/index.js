// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { firebaseConfig } from "./firebase.js"
import { getDatabase, set, update, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
}
    from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth()
// Firebase end


// Register start
let registerNewUser = () => {
    const username = document.getElementById("register_username").value
    const email = document.getElementById("register_email").value
    const password = document.getElementById("register_password").value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // signed in
            const user = userCredential.user

            const createdAt = new Date()
            set(ref(database, "users/" + user.uid), {
                role: "user",
                user_email: email,
                user_username: username,
                created_at: `${createdAt}`
            })

            console.log("New user successfully registered")
        })
        .catch((error) => {
            const errorCode = error.errorCode
            const errorMessage = error.message
            alert(errorMessage)
        })
}
document.getElementById("signUp").addEventListener("click", registerNewUser)
// Register end

// Login start

let loginToSite = () => {

    const email = document.getElementById("login_email").value
    const password = document.getElementById("login_password").value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const lastLoginAt = new Date()
            update(ref(database, "users/" + user.uid), {
                last_login: `${lastLoginAt}`
            })

            console.log("User successfully logged in")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
}

document.getElementById("signIn").addEventListener("click", loginToSite)
// Login end

// Sign out start
let signOutFunc = () => {
    signOut(auth).then(() => {
        console.log("User successfully logged out")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
    });
}
document.getElementById("signOut").addEventListener("click", loginToSite)
// Sign out end





// Check if logged in start
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

    }
    else {

    }
})

// Check if logged in end