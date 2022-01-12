import React, { useState, useCallback } from "react";

function useInput(initialdata: any) {
  const [value, setValue] = useState(initialdata);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
}

export default useInput;
