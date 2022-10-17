import React from "react"

export class ErrorBoundary extends React.Component<{children: any  }> {
    constructor(props: any) {
      super(props as any)
    }
    

    componentDidCatch(error: any, errorInfo: any) {
      // You can use your own error logging service here
      console.log({ error, errorInfo })
    }
    render() {
      return this.props.children
    }
  }
  
  export default ErrorBoundary