import React, { useState } from 'react';

const getNow = () => {

  return new Date().toLocaleTimeString();
}
const Clock: React.FC = () => {
  // 2022-01-22T14:55:27.195Z
  const [now, setNow] = useState('');
  setInterval(() => {
    setNow(getNow());
  }, 1000)
  return (
    <>{now}</>
  )
}

export default Clock;