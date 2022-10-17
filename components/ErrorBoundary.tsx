import React from "react"

export class ErrorBoundary extends React.Component {
    constructor(props: any) {
      super(props)
  
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
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