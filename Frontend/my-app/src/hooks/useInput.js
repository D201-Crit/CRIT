import { useCallback, useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  // state와 callback를 합쳐서 한번에 반환
  // console.log("된당!", value);
  return [value, handler, setValue];
};

export default useInput;
