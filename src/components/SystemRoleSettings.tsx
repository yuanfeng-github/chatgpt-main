import { Show } from 'solid-js'
import IconEnv from './icons/Env'
import IconX from './icons/X'
import type { Accessor, Setter } from 'solid-js'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
}

export default (props: Props) => {
  let systemInputRef: HTMLTextAreaElement

  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemInputRef.value)
    props.setSystemRoleEditing(false)
  }
  const handleSelectChange = (value) => {
    props.setCurrentSystemRoleSettings(value)
    props.setSystemRoleEditing(false)
  }

  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div>
            <div class="fi gap-1 op-50 dark:op-60">
              <Show when={props.canEdit()} fallback={<IconEnv />}>
                <span onClick={() => props.setCurrentSystemRoleSettings('')} class="sys-edit-btn p-1 rd-50%" > <IconX /> </span>
              </Show>
              <span>助手角色:</span>
            </div>
            <div class="mt-1">
              {props.currentSystemRoleSettings()}
            </div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
          <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class="sys-edit-btn">
            <IconEnv />
            <span>设置助手角色</span>
          </span>
        </Show>
      </Show>
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class="fi gap-1 op-50 dark:op-60">
            <IconEnv />
            <span>助手角色信息:</span>
          </div>
          <p class="my-2 leading-normal text-sm op-50 dark:op-60">设置不同角色场景提示词让AI的回复更符合您的期望.</p>
          <div>
            <textarea style="font-size: 14px;"
              ref={systemInputRef!}
              placeholder="我想让你担任网页设计顾问。我将为您提供有关组织需要协助设计或重新开发他们的网站的细节，您的角色是建议最合适的界面和功能，可以提高用户体验，同时也满足公司的业务目标。你应该运用你的 UX/UI 设计原则、编码语言、网站开发工具等方面的知识，为项目制定一个全面的计划。"
              autocomplete="off"
              autofocus
              rows="4"
              gen-textarea
            />
          </div>
          <div>

          </div>
          <button onClick={handleButtonClick} gen-slate-btn>
            Set
          </button>
        </div>
      </Show>
    </div>
  )
}
