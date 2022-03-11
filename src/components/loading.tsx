import React from 'react';
import { Spin } from 'antd';

const Loading: React.FC = () => {
    return (
        <div className="info">
            <Spin />
        </div>
    );
}

export default Loading;