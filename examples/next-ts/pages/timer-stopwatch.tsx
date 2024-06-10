import { normalizeProps, useMachine } from "@zag-js/react"
import * as timer from "@zag-js/timer"
import { useId } from "react"
import { StateVisualizer } from "../components/state-visualizer"
import { Toolbar } from "../components/toolbar"

export default function Page() {
  const [state, send] = useMachine(
    timer.machine({
      id: useId(),
      autoStart: true,
    }),
  )

  const api = timer.connect(state, send, normalizeProps)

  return (
    <>
      <main className="timer">
        <div {...api.getRootProps()}>
          <div {...api.getItemProps({ type: "days" })}>{api.formattedTime.days}</div>
          <div {...api.getSeparatorProps()}>:</div>
          <div {...api.getItemProps({ type: "hours" })}>{api.formattedTime.hours}</div>
          <div {...api.getSeparatorProps()}>:</div>
          <div {...api.getItemProps({ type: "minutes" })}>{api.formattedTime.minutes}</div>
          <div {...api.getSeparatorProps()}>:</div>
          <div {...api.getItemProps({ type: "seconds" })}>{api.formattedTime.seconds}</div>
        </div>

        <div style={{ display: "flex", gap: "4px" }}>
          <button onClick={api.start}>START</button>
          <button onClick={api.pause}>PAUSE</button>
          <button onClick={api.resume}>RESUME</button>
          <button onClick={api.reset}>RESET</button>
        </div>
      </main>

      <Toolbar controls={null} viz>
        <StateVisualizer state={state} />
      </Toolbar>
    </>
  )
}
