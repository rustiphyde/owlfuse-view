import * as admin from 'firebase-admin';
import { serviceAccountKey } from '../serviceAccountKey.json'; 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https//owlfuse-app.firebaseio.com",
    storageBucket: "owlfuse-app.appspot.com"
})

export default admin;