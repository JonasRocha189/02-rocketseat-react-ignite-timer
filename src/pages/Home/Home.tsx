import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDownForm'
import { CyclesContext } from '../../contexts/CycleContext'
// controlled x uncontrolled

/**
 * function register(name: string){
 *  return {
 *    onChange: () => void,
 *    onBlur: () => void,
 *    onFocus: () => void,
 *  }
 * }
 */

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ter no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ter no máximo 60 minutos'),
})

// interface newCycleFormdata {
//   task: string
//   minutesAmount: number
// }

// automatizando a interface
type newCycleFormdata = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<newCycleFormdata>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  // console.log(formState.errors)
  // console.log(cycles)

  function handleCreateNewCycle(data: newCycleFormdata) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisbled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} /> Interromper
          </StopCountdownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisbled} type="submit">
            <Play size={24} /> Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
