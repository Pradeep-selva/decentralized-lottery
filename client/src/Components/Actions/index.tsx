import React, { useState } from "react";
import "./index.css";
// import { Lottery } from "../../Utils";

const Actions = () => {
  const [ether, setEther] = useState(0);

  return (
    <form>
      <div className={"form-control"}>
        <label style={{ fontSize: "1.5rem" }}>
          <b>Ether (min: 0.001)</b>
        </label>
        <input
          className={"input"}
          type={"number"}
          value={ether}
          style={{ marginTop: 10 }}
          onChange={({ target: { value } }) => setEther(parseInt(value))}
        />
      </div>
      <input type={"submit"} className={"submit"} />
    </form>
  );
};

export default Actions;
