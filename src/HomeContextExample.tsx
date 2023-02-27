import { createContext, useContext, useState } from 'react'

const CyclesContext = createContext({} as any)

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)

  return (
    <>
      <h1>NewCycleForm</h1>
      Activecycle = {activeCycle}
      <button
        onClick={() => {
          setActiveCycle(2)
        }}
      >
        Alterar Cycle
      </button>
    </>
  )
}

function CountDown() {
  const { activeCycle } = useContext(CyclesContext)

  return (
    <div>
      <h1>CountDown</h1>
      ActiveCycle = {activeCycle}
    </div>
  )
}

export function HomeContextExample() {
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <h1>Home</h1>
        <NewCycleForm />
        <CountDown />
      </div>
    </CyclesContext.Provider>
  )
}
