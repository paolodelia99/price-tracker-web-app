import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import alert from "./alert";
import stock from "./stock";
import forex from "./forex";
import crypto from "./crypto";

export default combineReducers({
    auth,
    profile,
    alert,
    stock,
    forex,
    crypto
})