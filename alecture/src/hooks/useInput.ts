import React, { useState, useCallback } from "react";

function useInput() {
  const [value, setValue] = useState("");
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
}

export default useInput;
