import React, {useEffect, useRef} from "react";

export default function useAttributes(attrs){
  const ref = useRef()
  useEffect(() => {
    if(ref.current && attrs){
      Object.keys(attrs).forEach((key) => {
        ref.current.setAttribute(key, attrs[key])
      })
    }
  }, [attrs])

  return ref
}
