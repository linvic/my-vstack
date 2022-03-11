import React from 'react';

interface State {
    hasError: boolean
}
interface Props {}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props:any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    render() {
        if (this.state.hasError) {
            return <div className="info">资源加载失败，请刷新页面重试</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;