import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const descList = ['about', 'help', 'developers', 'concat', 'support', 'github'];
  return (
    <div className="d-f" style={{ flexWrap: 'wrap', backgroundImage: '' }}>
      {descList.map((text, index) => <div key={index} style={{
        width: '33%', textAlign: 'center', marginBottom: 12, cursor: 'pointer', color: '#FFF'
      }}
      ><a href={"https://t.me/CowboyCapital"}> {t(text)} </a></div>)}
    </div>
  )
}

export default Footer;