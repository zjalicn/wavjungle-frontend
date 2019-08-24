import { combineReducers } from "redux";
import { alert } from "./alertReducer";
import { authenticate } from "./authReducer";
import { registration } from "./registrationReducer";
import { promoCode } from "./promoCodeReducer";

const rootReducer = combineReducers({
  alert,
  authenticate,
  registration,
  promoCode
});

export default rootReducer;