import { useEffect, useState, Component, ComponentType, useCallback } from 'react'

type IForceUpdate = () => void

interface ISubscribers {
  [key: number]: IForceUpdate
}

export default function ForceUpdate() {
  
  let id = 1
  const subscribers: ISubscribers = {}

  function subscribe(forceUpdate: IForceUpdate) {
    subscribers[++id] = forceUpdate
    return id
  }

  function unsubscribe(id: number) {
    delete subscribers[id]
  }
  
  function useForceUpdate() {
    const setState = useState(true)[1]
    const forceUpdate = useCallback(() => {
      setState((value) => !value)
    }, [setState])
    useEffect(() => {
      const id = subscribe(forceUpdate)
      return () => unsubscribe(id)
    }, [])
  }

  function withForceUpdate(Comp: ComponentType): ComponentType {
    return class extends Component {
      private id?: number
      public componentDidMount() {
        this.id = subscribe(this.forceUpdate)
      }
      public componentWillUnmount() {
        if (this.id) {
          unsubscribe(this.id)
        }
      }
      public render() {
        return (
          <Comp {...this.props} /> 
        )
      }
    }
  }

  function forceUpdate() {
    Object.values(subscribers).forEach((forceUpdate) => {
      forceUpdate()
    })
  }

  return { useForceUpdate, withForceUpdate, forceUpdate }
}