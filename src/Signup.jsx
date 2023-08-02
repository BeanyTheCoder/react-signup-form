import { useState } from "react";

import "./App.css";

export default function SignupForm() {
  let [strength, setStrength] = useState(0);
  let [validation, setValidation] = useState([]);
  let [passwordShown, setPasswordShown] = useState(false);

  function showhide(e) {
    setPasswordShown(!passwordShown);
  }

  function validatePassword(e) {
    let password = e.target.value;

    let currentValidation = [...validation]

    currentValidation.splice(0, 1,password.length >= 5);
    currentValidation.splice(1, 1,password.search(/[A-Z]/) > -1);
    currentValidation.splice(2, 1,password.search(/[0-9]/) > -1);
    currentValidation.splice(3, 1,password.search(/[\-$&+,:;=?@#!%]/) > -1);

    setStrength(currentValidation.reduce((accum, current) => accum + current));

    setValidation(currentValidation);
  }

  return (
    <form>
      <div className="field">
        <input
          type="email"
          name="email"
          id="email"
          placeholder=""
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="field">
        <input
          type={passwordShown ? "text" : "password"}
          name="password"
          id="password"
          placeholder=""
          onInput={validatePassword}
        />
        <label htmlFor="password">Password</label>
        <button type="button" onClick={showhide}>
          {passwordShown ? "🙈" : "👁️"}
        </button>
      </div>
      <div className="password-strength">
        <div className={strength > 0 ? `bar shown` : `bar`}></div>
        <div className={strength > 1 ? `bar shown` : `bar`}></div>
        <div className={strength > 2 ? `bar shown` : `bar`}></div>
        <div className={strength > 3 ? `bar shown` : `bar`}></div>
      </div>
      <div className="password-strength-params">
        <ul>
          <li>{validation[0] ? "✅" : "❌"} Must be at least 5 characters</li>
          <li>{validation[1] ? "✅" : "❌"} Must contain a capital letter</li>
          <li>{validation[2] ? "✅" : "❌"} Must contain a number</li>
          <li>{validation[3] ? "✅" : "❌"} Must contain: -$&+,:;=?@#!%</li>
        </ul>
      </div>
      <div className="submit">
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
}
