import { getStorage, ref } from "firebase/storage";
import firebase from "./firebase";

const storage = getStorage(firebase);

export default storage;